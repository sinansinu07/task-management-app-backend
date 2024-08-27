const { timeStamp } = require("console")
const mongoose = require("mongoose")
const { Schema, model } = mongoose

const taskSchema = new Schema ({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    title : String,
    description : String,
    status : String,
    priority : String
}, { timestamps :true })

const Task = model("Task", taskSchema)
module.exports = Task
