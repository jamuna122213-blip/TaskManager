const express= require('express')
const router = express.Router()
const Task = require("../models/Task.js")
const { toggleTask } = require("../controllers/authControllers.js")
const authMiddleware = require("../middleware/authMiddleware.js")

router.post("/",async (req,res) => {

    try{
        const {title,description,dueDate}=req.body
        
        if (!title || !title.trim()){
            return res.status(400).json({
                message:"Task title is required"
            })
        }

        if (dueDate && isNaN(Date.parse(dueDate))){
            return res.status(400).json({
                message:"Invalid due date"
            })
        }

        const task = await Task.create({
            title,
            description,
            dueDate,
            user:req.user.id
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

     filter.user=req.user.id
      
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
        const task = await Task.findById({
            _id:req.params.id,
            user:req.user.id
        })
        next
        
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
        res.status(404).json({
            message:error.message
        })
    }
})

router.put("/:id",async (req,res) => {
    try{

        const {title,description,dueDate,completed}=req.body

        const task = await Task.findOneAndUpdate(
           { _id:req.params.id,
            user:req.user.id},
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
        const task = await Task.findByIdAndDelete(
            {_id:req.params.id,
            user:req.user.id}
        )

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

router.patch("/:id/toggle",authMiddleware,toggleTask)

module.exports = router