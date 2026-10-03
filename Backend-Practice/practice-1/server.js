require('dotenv').config(); // always on first line of the server.js file
const express = require('express');
const connectDB = require('./config/db');
const instructorRoutes = require('./routes/instructorRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
const startServer = async() => {
    await connectDB();

    app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
    })
}
startServer();

// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({message : "Server is Good and running too"});
})

app.use('/api/instructors', instructorRoutes);
app.use('/api/departments', departmentRoutes);

app.use((req, res) =>{
    res.status(404).json({
        success : false,
        message : `Route not found : ${req.originalUrl}`
    })
})

app.use(errorHandler); // Error handling middleware
