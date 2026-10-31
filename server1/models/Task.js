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
    dueData:{
        type:Date,
        default:null
    }
},{
  timestamps:true
}
)

const Task = mongoose.model("Task",taskmanager)

module.exports = Task
