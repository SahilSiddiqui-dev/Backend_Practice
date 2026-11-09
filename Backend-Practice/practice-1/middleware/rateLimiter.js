const rateLimit = require('express-rate-limit');
const AppError = require('../utils/AppError');

const loginLimiter = rateLimit({
    windowMs : 15*60*1000,
    limit : 5,
    standardHeaders : 'draft-7',
    legacyHeaders : false,
    handler : (req, res, next) => {
        next(new AppError('Too many requests', 429));
    }
})

const apiLimiter = rateLimit({
    windowMs : 15*60*1000,
    limit : 100,
    standardHeaders : 'draft-7',
    legacyHeaders : false,
    handler : (req, res, next) => {
        next(new AppError('Too many requests', 429));
    }
})

module.exports = {loginLimiter, apiLimiter};