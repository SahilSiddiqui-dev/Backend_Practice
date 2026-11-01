const AppError = require('../utils/AppError');

const authorize  = (...roles) => (req, res, next) => {
    const userRole = req.user.role;
    if(userRole && roles.includes(userRole)){
        return next();
    }
    throw new AppError('you are not authorized to perform this action', 403);
}

module.exports = authorize;