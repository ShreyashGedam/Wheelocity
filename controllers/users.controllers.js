const { Router } = require("express");
const UserModel = require("../models/users.models");

const userRouter = Router()

userRouter.post("", async (req, res) => {

    const email = await UserModel.findOne({ email: req.body.email })

    if (email) {
        return res.status(402).send("Email already exists")
    }

    var payload = {
        ...req.body,
        amount: 0,
        transcation: []
    }

    const user = await new UserModel(payload)
    user.save((err, success) => {
        if (err) {
            res.status(500).send({ message: "Error Occured" })
        }

        return res.status(200).send("Sign up Success")
    })
})

module.exports = userRouter 