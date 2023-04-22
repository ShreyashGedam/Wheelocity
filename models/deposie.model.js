const mongoose = require("mongoose")

const deposieSchema = mongoose.Schema({
    email : String,
    password : String,
    amount: Number
    
})

const UserModel = mongoose.model("users" , deposieSchema)

module.exports = UserModel