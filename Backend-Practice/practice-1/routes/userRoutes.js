const express = require('express');
const route = express.Router();
const validate = require('../middleware/validate');
const userSchemaValidate = require('../validators/registerValidation');
const loginSchemaValidation = require('../validators/loginSchemaValidation');
const {register, login, getMe, refresh, logout, adminOnly} = require('../controllers/userController')
const {loginLimiter} = require('../middleware/rateLimiter');
const protect = require('../middleware/authMiddleware')
const authorize = require('../middleware/authorize');

route.get('/me', protect, getMe);
route.post('/register', validate(userSchemaValidate), register);
route.post('/login', loginLimiter, validate(loginSchemaValidation), login);
route.post('/refresh', refresh);
route.post('/logout', logout);
route.get('/adminOnly', protect, authorize('admin'), adminOnly);

module.exports = route;