const mongoose = require('mongoose')

const signUp = mongoose.Schema(
    {
        Firstname: {
            type: String,
            required: [true, "Please enter name"]
        },
        lastname: {
            type: String,
            required: [true, "Please enter name"]
        },
        mail: {
            type: String,
            required: true
        },
        phoneNo: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength : 4,
            maxlenth: 20
        },
        gender: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)


const userdetails = mongoose.model('userdetails', signUp);

module.exports = userdetails;