const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        match  : [/^\S+@\S+\.\S+$/, "Please Provide Valid email"],
    },
    designation : {
        type : String,
        required : true,
        enum : {
            values : ['Professor', 'Assistant Professor', 'HOD',  'Associate Professor'],
            message : "{Value} is not valid designation"
        },
        default: 'Assistant Professor'
    },
    department : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'departmentSchema',
        required : [true, "Instructor must belong to department"]
    },

    isActive : { // for deactivating any account or instructor as deleting can cause problem
        type : Boolean,
        default : true
    }
},  
    {timestamps : true} 
)

module.exports = mongoose.model('instructor', instructorSchema);