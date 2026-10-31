const mongoose = require("mongoose")


const connectDB = async (req,res) => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)

        console.log("MONGODN CONNECTED SUCC")
    }
    catch{
        console.log("error occured",error.message)
        process.exit(1)
    }
}

module.exports =connectDB