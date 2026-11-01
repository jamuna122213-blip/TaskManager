const mongoose = require("mongoose")

const dns = require("node:dns")
dns.setServers(["8.8.8.8", "8.8.4.4"])

let isConnected=false
const connectDB = async (req,res) => {
    if (isConnected) return
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        isConnected=true
        console.log("MONGODN CONNECTED SUCC")
    }
    catch (error) {
        console.log("error occured",error.message)
        throw error
    }
}

module.exports =connectDB