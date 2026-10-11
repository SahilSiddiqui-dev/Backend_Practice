const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const getToken = require('../utils/jwt');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is required"],
        trim : true
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : true,
        trim : true,
        lowercase : true,
        match : [/^\S+@\S+\.\S+$/, "Enter Valid Email"]
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        minlength : [6, "Password must be at least 6 characters long"],
        select: false
    },
    role : {
        type : String,
        enum : ['Student', 'Instructor', 'Admin'],
        default : 'Student'
    }

},
    {timestamps : true}
);

// Hash the password before saving the user




modules.exports = mongoose.model('User', userSchema);