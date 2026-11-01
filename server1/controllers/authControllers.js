const express=require("express")
const User = require("../models/User.js")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Task = require("../models/Task.js")
const isProduction = process.env.NODE_ENV === "production"

const register = async (req,res) => {
    try{
     const {username,email,password}=req.body
     
    
     if (!username || !username.trim()){
        return res.status(400).json({
            message:"Username  is required"
        })
     }
     
     if (!email || !email.trim()){
        return res.status(400).json({
            message:"Email is required"
        })
     }    

     if (!password || password.length < 8){
        return res.status(400).json({
            message:"Password is required and must be at least 8 characters long"
        })
     }
     
     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return res.status(400).json({
            message:"Invalid email format"
        })
     }


     const existinguser = await User.findOne({email})
     if (existinguser){
        return res.status(409).json({
            message:"Email Already exist"
        })
     }
     const h_password = await bcrypt.hash(password,10)

     const user = await User.create({
        username,
        email,
        password:h_password
     })
      
     res.status(201).json({
        message:"User registrated successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
        }
     })
    }
    catch (error){
        res.status(500).json({
            message:error.message
        })

    }
}


const login = async (req,res) => {
    try{
        const {email,password} = req.body

        const user = await User.findOne({email})
        if (!user){
          return res.status(401).json({
            message:"invalid email found"
          })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }
        
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"2d"}
        )

         
        res.cookie("token",token,{
            httpOnly:true,
            secure:isProduction,
            sameSite:isProduction ? "none" : "lax",
            maxAge:24*60*60*1000
        })

        
        res.status(200).json({
            message:"Login SUccessfull"
        })
    }
    catch (error){
        res.status(500).json({
            message:error.message
        })
    }
}

const logout = (req,res) => {
    res.clearCookie("token",{
        httpOnly:true,
        secure:isProduction,
        sameSite:isProduction ? "none" : "lax"
    })

    res.status(200).json({
        message:"Logout successfull"
    })
}

const toggleTask = async (req,res) => {
    try{

     const task = await Task.findOne({
        _id:req.params.id,
        user:req.user.id
     })

     if(!task){
        return res.status(404).json({
            message:"Task not found"
        })
     }

     task.completed =!task.completed
     await task.save()

     res.status(200).json({
        message:"Task status updated",
        task
     })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports={ register,login,logout,toggleTask }