const express = require('express');
const route = express.Router();
const {addBook, getAllBooks, changeStatus} = require('../controller/bookController');

route.post('/', addBook);
route.get('/all', getAllBooks);
route.patch('/:id', changeStatus);

module.exports = route;