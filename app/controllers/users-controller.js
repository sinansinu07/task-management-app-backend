const User = require("../models/user-model")
const { validationResult } = require("express-validator")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const usersCltr = {}

usersCltr.register = async (req, res) => {
    const errors =  validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array() })
    }
    try {
        const { body } = req
        const user = new User(body)
        const salt = await bcryptjs.genSalt()
        const encryptedPassword = await bcryptjs.hash(user.password, salt)
        user.password = encryptedPassword
        await user.save()
        // res.status(201).json(user)
        const tokenData = {
            id : user._id
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn : "7d"})
        console.log(user)
        console.log(token)
        res.status(201).json({ token : token })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error : "Internal Server Error" })
    }
}

usersCltr.login = async (req, res) => {
    const errors =  validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array() })
    }
    try {
        const { body } = req
        const user = await User.findOne({ email: body.email })
        if(!user) {
            return res.status(404).json({ error : "Invalid Email/Password"}) 
        }
        const checkPassword = await bcryptjs.compare(body.password, user.password)
        if(!checkPassword) {
            return res.status(404).json({ error : "Invalid Email/Password"}) 
        }
        const tokenData = {
            id : user._id
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn : "7d"})
        res.status(201).json({ token : token })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error : "Internal Server Error" })
    }
}

module.exports = usersCltr