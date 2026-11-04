const mongoose = require('mongoose');

const connectDB = async() => {
    if(!process.env.MONGO_URI) {
        console.error('Connection string is missing');
        process.exit(1);
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('Database is connected', conn.connection.host);
    }
    catch(err) {
        console.error('failed to connect Database');
        process.exit(1);
    }
}

module.exports = connectDB;

