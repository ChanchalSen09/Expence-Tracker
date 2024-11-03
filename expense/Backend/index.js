const express = require('express');
const cors = require('cors'); // Import the cors package
const { connectDB } = require('./config/database'); // Make sure this matches your actual db file name
require('dotenv').config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Import and use the auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Define the port to listen on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
