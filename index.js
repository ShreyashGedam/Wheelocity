const express = require('express')
const userRouter = require('./controllers/users.controllers')
const connection = require('./db')
const cors = require("cors")
const deposieRouter = require('./controllers/deposite.controller')
const transactionRouter = require('./controllers/trans.controller')

const app = express()
app.use(cors())

app.use(express.json())

app.use("/register", userRouter)
app.use("/deposite", deposieRouter)
app.use("/transcation", transactionRouter)


app.listen(8080, async () => {
    try {
        await connection
        console.log("Conncet to the backend")
    } catch (error) {
        console.log("Something went wrong")
    }

    console.log("Server is connceting")
})