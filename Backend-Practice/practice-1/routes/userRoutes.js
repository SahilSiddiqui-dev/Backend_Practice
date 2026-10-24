const express = require('express');
const route = express.Router();
const validate = require('../middleware/validate');
const userSchemaValidate = require('../validators/registerValidation');
const {register} = require('../controllers/userController')

route.post('/register', validate(userSchemaValidate), register);

module.exports = route;