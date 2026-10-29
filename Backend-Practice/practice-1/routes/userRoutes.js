const express = require('express');
const route = express.Router();
const validate = require('../middleware/validate');
const userSchemaValidate = require('../validators/registerValidation');
const loginSchemaValidation = require('../validators/loginSchemaValidation');
const {register, login, getMe} = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')

route.get('/me', protect, getMe);
route.post('/register', validate(userSchemaValidate), register);
route.post('/login', validate(loginSchemaValidation), login);
route.post('/refresh', )

module.exports = route;