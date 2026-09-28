require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const mangoosConnect  = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  }
  catch (err) {
    console.error("Error connecting to mongodb", err.message);
    process.exit(1); // Exit the process with an error code
  }
}

mangoosConnect();

app.get('/', (req, res) => {
  return res.send('Welcome to the API');
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});