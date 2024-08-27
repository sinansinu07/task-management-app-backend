// const Task = require("../models/task-model")

const taskSchema = {
    title : {
        notEmpty : {
            errorMessage : "Title is Required"
        },
        trim : true
    },
    status : {
        notEmpty : {
            errorMessage : "Status is Required" 
        },
        isIn : {
            options : [["pending", "In progress", "completed"]],
            errorMessage: "Select status from the given list"
        },
        trim : true
    },
    priority : {
        notEmpty : {
            errorMessage : "Priority is Required"
        },
        isIn : {
            options : [["high", "medium", "low"]],
            errorMessage: "Select priority from the given list"
        },
        trim : true
    }
}

module.exports = taskSchema