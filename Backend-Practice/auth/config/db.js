const mongoose = require('mongoose');

const connectDB = async() => {
    try {
    const conn = await mongoose.connect(Process.env.MONGO_URI);
    console.log(`database is connected : ${conn.connection.host}`);
    }
    catch(err) {
        console.error("Database is not connected",err.message);
        process.exit(1);
    }
}

module.exports = connectDB;