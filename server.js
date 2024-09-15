// Load environment variables from config.env file
require('dotenv').config();

//Database connection is done in conn.js file
require("./connection/conn");

// Importing dependencies
const cors = require('cors');
const express = require('express');

const auth = require("./routes/auth");
const list = require("./routes/list");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());






//Routes
app.get("/", (req, res) => {
  res.send('Hello, welcome to the API!');
});

app.use("/api/v1/", auth); //signup and login
app.use("/api/v2/", list); //task creation, deletion, updation

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// Starting the Server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
