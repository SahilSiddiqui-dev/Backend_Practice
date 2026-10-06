const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/registerUserController');const { loginUser } = require('../controllers/loginUserController');