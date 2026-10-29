const  jwt = require('jsonwebtoken');

const getToken = user => {
    return jwt.sign(
        {
        id : user._id,
        role : user.role
        },

        process.env.JWT_SECRET,

        {
        expiresIn: '15m'
        }
    )
}

const  getRefreshToken = user => {
    return jwt.sign(
        {
            id:user._id,
            role: user.role
        },

        process.env.JWT_REFRESH_SECRET,

        {
            expiresIn: '7d'
        }
    )
}

module.exports = {getToken, getRefreshToken};