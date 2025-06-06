const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model("user", userSchema)

module.exports = UserModel