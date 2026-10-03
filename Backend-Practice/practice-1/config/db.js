const mongoose = require('mongoose');


const connectDB = async () => {
    if(!process.env.MONGO_URI){
        console.log("DataBase String is not present in the database");
        process.exit(1);
        }
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully to", conn.connection.host);
    }
    catch(err) {
        console.error(`Database connection failed due to ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;