const express= require('express')
const router = express.Router()
const Task = require("../models/Task.js")

router.post("/",async (req,res) => {

    try{
        const {title,description,dueDate}=req.body

        const task = await Task.create({
            title,
            description,
            dueDate
        })

        res.status(201).json({
            message:"Task created successfully",
            task
        })
    }
    catch (error){
       res.status(400).json({
        "instruction":"error occured at task",
          message:error.message
       })
    }
})

router.get("/",async (req,res) => {
    try{
    
     const {search,completed} = req.query
    
    const page=Number(req.query.page) || 1
    const limit=Number(req.query.limit) || 5

    const sortby = req.query.sortby || "title"
    const order = req.query.order==="desc"?-1:1

    
    const skip = (page-1)*limit
     let filter={}

     if (search){
        filter.title={
            $regex:search,
            $options:"i"
        }
     }

     if (completed==="true"){
        filter.completed=true
     }
     else if (completed=="false"){
       filter.completed =false
     }
     console.log("QUery",req.query)
      
     const tasks = await Task.find(filter)
     .skip(skip).limit(limit).sort({[sortby]:order})
    

     res.status(200).json({
        count:tasks.length,
        tasks,
        limit,
        page, 
     })

     }
    catch (error){
        res.status(400).json({
            message:error.message
        })
    }
})


router.get("/:id",async (req,res) => {
    try{
        const task = await Task.findById(req.params.id)
        if (!task){
            return res.status(400).json({
                message:"task not found"
            })
        }
        res.status(200).json({
            task
        })
    }
    catch (error){
        res.status(400).json({
            message:error.message
        })
    }
})

router.put("/:id",async (req,res) => {
    try{

        const {title,description,dueDate}=req.body

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                dueDate
            },
            {
                new:true,
                runValidators:true
            }
        )
        if (!task){
            return res.status(200).json({
                messgae:"Task not found"
            })
        }
        
        res.status(201).json({
            message:"Task updated successfully",
            task
        })
    }
    catch (error){
        res.status(400).json({
            message:error.message
        })
    }
})

router.delete("/:id",async (req,res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(400).json({
                message:"task not found"
            })
        }

        res.status(201).json({
            message:"Task deleted successfully",
            task
        })
    }
    catch (error){
        res.status(400).json({
            message:error.message
        })
    }
})
module.exports = router