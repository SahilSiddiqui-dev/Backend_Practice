const asyncHandler = require('../utils/asyncHandler')
const authService = require('../services/authService')
const setRefreshCookie = require('../utils/setRefreshCookie')

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

exports.login = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    const {refreshToken, token, user} = await authService.loginService({email, password});

    setRefreshCookie(res, refreshToken);

    res.status(200).json({
        success : true,
        token,
        data : user
    })
})

exports.getMe = (req, res) => {
    const user = req.user;

    res.status(200).json({
        success : true,
        data : {
                _id : user._id,
                username : user.username,
                email : user.email,
                role : user.role
            }
        })
}
exports.refresh = asyncHandler(async(req, res) => {
    const { refreshToken } = req.cookies;

    if(!refreshToken) {
        throw new AppError('Refresh token is missing', 401);
    }
    const {accessToken, newRefreshToken} = await authService.refreshService({refreshToken});

    setRefreshCookie(res, newRefreshToken);

    res.status(200).json({
        success : true,
        accessToken : accessToken
    })
}) 