const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const protect = asyncHandler(async(req, res, next) => {

    let payload;
    const { authorization } = req.headers;

    if(!authorization || !authorization.startsWith('Bearer ')) {
        throw new AppError('Invalid Authorization', 401);
    }

    const token = authorization.split(' ')[1];

    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch {
        throw new AppError('Invalid Token', 401);
    }

    const user = await User.findById(payload._id);

    if(!user) {
        throw new AppError('User not found', 401);
    }

    req.user = user;
    next();
})

module.exports = protect;
