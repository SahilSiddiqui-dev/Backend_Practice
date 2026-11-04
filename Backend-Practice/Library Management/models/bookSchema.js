const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
        lowercase : true
    },

    author :{
        type : String,
        required : true,
        trim : true,
        lowercase : true
    },

    category : {
        type : String,
        required : true,
        trim : true,
        lowercase : true
    },
    available : {
        type : Boolean,
        default : true
    }
},
    {timestamps : true}
)

module.exports = mongoose.model('Books', bookSchema);