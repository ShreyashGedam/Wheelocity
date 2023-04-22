const { Router } = require("express");
const UserModel = require("../models/users.models");
// const { findByIdAndUpdate } = require("../models/users.models");

const deposieRouter = Router()

deposieRouter.patch('', async (req, res) => {

    console.log("coming here")

    const email = await UserModel.findOne({ email: req.body.email })

    if (req.body.password == email.password) {
        
        const amount = email.amount + req.body.amount
        console.log(email._id)
        const user = await UserModel.findByIdAndUpdate({ _id: email._id }, { amount: amount }, { new: true })
        res.json(user)
        
    }
})

module.exports = deposieRouter