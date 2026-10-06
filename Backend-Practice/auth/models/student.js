const mongoose = require('mongoose');
const bcyrpt = require('bcryptjs');

const StudentSchema = create.mongoose.Schema({

    name : {
        type : String,
        required : true,
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
        trim : true,
        minlength : [6, "Password must be at least 6 characters long"],
        select : false // to not return password in any query
    },

    role : {
        type : String,
        enum : ['student', 'instructor', 'admin'],
        default : 'student'
    }
},
{
    timestamps : true
})

module.exports = mongoose.model('Student', StudentSchema);