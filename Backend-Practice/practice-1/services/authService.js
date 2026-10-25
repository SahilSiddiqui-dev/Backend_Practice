const User = require('../models/user');
const Login = require('../models/login');
const AppError = require('../utils/AppError')
const bcrypt = require('bcrypt');

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


}