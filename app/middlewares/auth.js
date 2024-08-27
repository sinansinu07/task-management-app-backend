const jwt = require("jsonwebtoken");
const authenticateUser = (req, res, next) => {
    const token = req.headers["authorization"]
    if(!token) {
        return res.status(401).json({ error : "Token is Required" })
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            id : tokenData.id
        }
        next()
    } catch(err) {
        console.log(err.message)
        res.status(401).json({ error : err.message })
    }
}

module.exports = authenticateUser