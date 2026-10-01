const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name :{
        type : String,
        required : [true, "Department is required"],
        unique : true,
        trim : true
    },
    code : {
        type : String,
        required : [true, "Code must be ME, CSE"],
        unique : true,
        uppercase : true,
        trim : true,
        minlength : [2, "Min len should be atleast 2 characters"],
        maxlength : [5, "max len should be atmost 5 characters"],
    },
    description : {
        type : String,
        required : true
    }
},
    { timestamps : true}
);

module.exports = mongoose.model('department', departmentSchema);