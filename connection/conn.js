const mongoose = require("mongoose");
require('dotenv').config();

//Environment variable for database url
const MONGODB_URI = process.env.MONGODB_URI;

// Connecting Database
const conn = async (req, res) => {
  try {
    await mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected"));
  } catch (err) {
    console.log(err);
    res.status(400).json({
        message: "Database not connected."
    });
  }
};
conn();

//Using try and catch is a good practice.
