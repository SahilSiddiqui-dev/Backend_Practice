const asyncHandler = require('../utils/asyncHandler')
const authService = require('../services/authService')

exports.register = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    const user = await authService.register({username, email, password});

    const newUser = {
        _id : user._id,
        username : user.username,
        email : user.email,
        role : user.role
    }

    res.status(201).json({
        success : true,
        data : newUser
    })
})
