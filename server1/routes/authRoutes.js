const express = require("express")
const { register,login,logout } = require("../controllers/authControllers")

const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router()
const User = require("../models/User.js")


router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)



router.get("/me",authMiddleware,async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password")

        if (!user){
            return res.status(404).json({
                message:"User not FOund"
            })
        }

        res.status(200).json({
            user
        })
    }
    catch (error){
        res.status(500).json({
            message:error.message
        })
    }
})

module.exports = router