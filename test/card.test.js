const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const userRouter = require('../routes/user');
const User = require('../models/User');

const app = express();
app.use(express.json());
app.use('/api', userRouter);

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://narendra1:narendra1@cluster0.fcwxv.mongodb.net/credit-card-test_db', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

// Your user tests here...
