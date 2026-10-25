const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true,
        select : false
    }
}, {timestamps : true})

module.exports = mongoose.model('Login', LoginSchema);