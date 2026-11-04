require('dotenv').config()
const express = require('express');
const connectDB = require('./config/db');
const bookRoute = require('./route/bookRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

const startServer = () => {
    connectDB();
    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`)
    })
}

startServer();

app.use(express.json());
app.use('/api/book', bookRoute);
