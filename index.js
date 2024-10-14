// app.js
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const publicRoutes = require('./routes/public');
const cors = require('cors'); // Import cors middleware

const app = express();
app.use(cors());


app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/public', publicRoutes);

const PORT = 5000;
app.listen(PORT, async() =>{
  await mongoose.connect('mongodb+srv://narendra1:narendra1@cluster0.fcwxv.mongodb.net/credit-card');
  });
    