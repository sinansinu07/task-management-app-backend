const Task = require("../models/task-model")
const tasksCltr = {}
const  { validationResult } = require("express-validator")
tasksCltr.create = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array() })
    }
    try {
        const { body } = req
        const task = new Task(body)
        task.userId = req.user.id
        await task.save()
        res.status(201).json(task)
    } catch(err) {
        res.status(500).json({ error : "Internal Server Error"})
        console.log(err)
    }
}
tasksCltr.list = async(req, res) => {
    try {
        const tasks = await Task.find({ userId : req.user.id }).sort({ createdAt : 1})
        res.status(200).json(tasks)
    } catch(err) {
        res.status(500).json({ error : "Internal Server Error"})
        console.log(err)
    }
}

tasksCltr.delete = async (req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findOneAndDelete({ _id : id, userId : req.user.id })
        res.status(200).json(task)
    } catch(err) {
        res.status(500).json({ error : "Internal Server Error"})
        console.log(err)
    }
}

tasksCltr.update =  async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array() })
    }
    const id = req.params.id
    const { body } = req
    try {
        const task = await Task.findOneAndUpdate({ _id : id, userId : req.user.id }, body, { new : true })
        res.status(200).json(task)
    } catch(err) {
        res.status(500).json({ error : "Internal Server Error"})
        console.log(err)
    }
}

module.exports = tasksCltr