const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim :  true
    },

    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true,
    },

    password : {
        type : String,
        required : true,
        select : false
    },

    role : {
        type : String,
        enum : {
            values : ['user', 'admin'],
            message : 'Please provide a valid role'
        },
        default : 'user'
    },


},
   {timestamps : true},
)

module.exports = mongoose.Model('User', UserSchema);
