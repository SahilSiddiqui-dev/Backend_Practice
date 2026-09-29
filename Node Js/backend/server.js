const express = require('express');
const app = express();
const studentRoute = require('./route');

app.use(express.json());

app.use('/student', studentRoute);

app.listen(8000, () => {
    console.log('server at http://localhost:8000')
})