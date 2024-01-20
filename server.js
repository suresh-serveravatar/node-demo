// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Create an Express app
const app = express();
const port = 3000;

// MongoDB connection setup using environment variables
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;
const mongoURI = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define a MongoDB Schema for the "User" model
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  // Add more fields as needed
});

// Create a MongoDB model for the "User" collection
const User = mongoose.model('User', userSchema);

// API route to fetch data from the "User" collection
app.get('/api/users', async (req, res) => {
  try {
    // Fetch data from the "User" collection
    const users = await User.find();

    // Send the users as JSON response
    res.json(users);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

