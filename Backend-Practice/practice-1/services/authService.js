const User = require('../models/user');
const Login = require('../models/login');
const AppError = require('../utils/AppError')
const bcrypt = require('bcrypt');
const {getToken, getRefreshToken} = require('../utils/getToken')
const setRefreshCookie = require('../utils/setRefreshCookie');
const { jwt } = require('zod');

exports.register = async ({username, email, password}) => {

    const userExists = await User.findOne({email : email});

    if(userExists) {
        throw new AppError('User already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username : username,
        email : email,
        password : hashedPassword
    })

    return user;
}

exports.loginService = async({email, password}) => {

    const user = await User.findOne({email}).select('+password');

    if(!user) {
        throw new AppError('Invalid email or password', 401)
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new AppError('Invalid email or password', 401);
    }

    const token = getToken(user);

    const refreshToken = getRefreshToken(user);

    return {
        refreshToken : refreshToken,
        token : token,
        user : {_id : user._id,
                username : user.username,
                email : user.email,
                role : user.role
            }
        }
}

exports.refreshService = async({refreshToken}) => {

    let payload;

    try {
        payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    }
    catch {
        throw new AppError('Cant get the refresh Token', 401);
    }

    const user = await User.findById(payload.id);

    if(!user) {
        throw new AppError('User not found', 401);
    }

    const newRefreshToken = getRefreshToken(user);
    const accessToken = getToken(user);

    return {
        newRefreshToken : newRefreshToken,
        accessToken : accessToken
    }

}