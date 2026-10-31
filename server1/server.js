const express = require("express")
const cors =  require("cors")
const connectDB = require("./config/db")
const router = require('./routes/taskRoutes')
const app = express()
require("dotenv").config()

app.use(cors({
    origin:"http://localhost:5173"
}))

app.use(express.json())

app.use("/api/tasks",router)

app.use("/",(req,res) => {
    res.json({
        message:"Task flow is running"
    })
})

 const startServer = async (req,res) => {
    try{
       await connectDB()
      
    const PORT = process.env.PORT || 5000;

    app.listen(PORT,() => {
        console.log(`SERVER RUNNING ON ${PORT}`)
    })
    }
     catch (error){
        console.log("failed to start server")
        process.exit()
     }
 }


 startServer()
 