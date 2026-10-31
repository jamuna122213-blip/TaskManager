const express=require("express")
const User = require("../models/User.js")
const router = express.Router()
const bcrypt = require("bcryptjs")


const register = async (req,res) => {
    try{
     const {username,email,password}=req.body
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

module.exports={ register }