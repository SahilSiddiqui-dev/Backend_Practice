const asyncHandler = require('../middleware/asyncHandler')
const authService = require('../services/authService')

exports.register = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    const user = await authService.register({username, email, password});

    const newUser = {
        username : user.username,
        email : user.email,
        role : user.role
    }

    res.status(201).json({
        success : true,
        data : newUser
    })
})
