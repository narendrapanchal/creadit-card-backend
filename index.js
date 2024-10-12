// app.js
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const publicRoutes = require('./routes/public');
const cors = require('cors'); // Import cors middleware

// Enable CORS for all routes
app.use(cors());

const app = express();

// Middleware
app.use(express.json());

// Database connection

// Routes
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/public', publicRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, async() =>{
  await mongoose.connect('mongodb+srv://narendra1:narendra1@cluster0.fcwxv.mongodb.net/credit-card');
   console.log(`Server running on port ${PORT}`)
  });
    