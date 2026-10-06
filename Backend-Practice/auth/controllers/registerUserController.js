const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const checkRole = require("../utils/checkRole");


exports.registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password) { 
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }
    const user = await User.create({
        name,
        email,
        password
    })

    res.status(200).json({
        success : true,
        data : user
    })

})