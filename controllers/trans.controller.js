const { Router } = require("express");
const UserModel = require("../models/users.models");
// const { findByIdAndUpdate } = require("../models/users.models");

const transactionRouter = Router()

transactionRouter.patch('/payment', async (req, res) => {

    console.log("coming here")

    const email = await UserModel.findOne({ email: req.body.email })

    if (req.body.password == email.password) {

        if (email.amount < req.body.amount) {
            res.json({
                message: 'Insufficeient balance'
            })
            return
        }

        const amountLeft = email.amount - req.body.amount
        // console.log(email._id)
        const amountArr = email.transcation.push(req.body.amount)

        const user = await UserModel.findByIdAndUpdate({ _id: email._id },
            { $push: { "transcation": req.body.amount } },
            { new: true })

        const _user = await UserModel.findByIdAndUpdate({ _id: email._id },
            { amount: amountLeft },
            { new: true })


        res.json(user)

    }
})

transactionRouter.post("/balance", async (req, res) => {

    const email = await UserModel.findOne({ email: req.body.email })

    if (req.body.password == email.password) {
        const user = {
            "Balance": email.amount
        }
        res.json(user)
    }
})

transactionRouter.post("/pastTrans", async (req, res) => {

    const email = await UserModel.findOne({ email: req.body.email })

    if (req.body.password == email.password) {
        // var arr = []
        // for (var i = 0; i < 20; i++) {

        //     if (email.transcation[i] !== null) {
        //         arr.push(email.transcation[i])
        //     }

        // }
        // res.json(arr)

        if (email.transcation.length <= 20) {
            res.json(email.transcation)
        } else {
            var result = email.transcation.splice(0, 20)
            res.json(result)
        }
    }
})

module.exports = transactionRouter