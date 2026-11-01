const mongoose = require("mongoose")

const taskmanager = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    dueDate:{
        type:Date,
        default:null
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
  timestamps:true
}
)

const Task = mongoose.model("Task",taskmanager)

module.exports = Task
