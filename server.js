require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { checkSchema } = require("express-validator")
const app = express()
const port = 3060

const configureDB = require("./config/database")
configureDB()

const tasksCltr = require("./app/controllers/tasks-controller")
const usersCltr = require("./app/controllers/users-controller")

const taskSchema = require("./app/validations/task-validation-schema")
const { userRegisterSchema, userLoginSchema } = require("./app/validations/user-validation-schema")
const authenticateUser = require("./app/middlewares/auth")

app.use(express.json())
app.use(cors())

app.post("/api/user/register", checkSchema(userRegisterSchema), usersCltr.register)
app.post("/api/user/login", checkSchema(userLoginSchema),usersCltr.login)
app.post("/api/user/tasks", authenticateUser, checkSchema(taskSchema), tasksCltr.create)

app.get("/api/user/tasks", authenticateUser, tasksCltr.list)

app.delete("/api/user/tasks/:id", authenticateUser, tasksCltr.delete)

app.put("/api/user/tasks/:id", authenticateUser, checkSchema(taskSchema), tasksCltr.update)

app.listen(port, () => {
    console.log(`Task Management App is running Successfully on port ${port}`)
})