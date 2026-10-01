require('dotenv').config(); // always on first line of the server.js file
const express = require('express');
const connectDB = require('./config/db');
const instructor = require('./models/instructor');

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();
// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({message : "Server is Good and running too"});
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})