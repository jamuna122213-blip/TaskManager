const express = require("express")
const cors =  require("cors")
const cookieParser =require("cookie-parser")
require("dotenv").config()



const connectDB = require("./config/db")
const router = require('./routes/taskRoutes')
const authRoutes = require("./routes/authRoutes")
const authMiddleware = require("./middleware/authMiddleware.js")


const app = express()




const allowdedOrigin = [
     "http://localhost:5173",
    process.env.CLIENT_URL
].filter(Boolean)

app.use(cors({
    origin:allowdedOrigin,
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use(async (req,res,next) => {
    await connectDB()
    next()
})

app.use("/api/auth",authRoutes)
app.use("/api/tasks",authMiddleware,router)


app.get("/",(req,res) => {
    res.json({
        message:"Task flow is running"
    })
})

 

if (process.env.NODE_ENV!="production")
{
    const PORT = process.env.PORT ||5000
    app.listen(PORT,() =>{
        console.log(`SERVER RUNNING ON ${PORT} `)
    })
}
 

module.exports =app