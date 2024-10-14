const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Card = require('../models/Card.js');
const Application = require('../models/Application');
const User = require('../models/User.js');
const verify = require('../middleware/verifyToken.js');

// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('Admin not found');

    const isMatch = await user.checkPassword(password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1d' });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server error');
  }
});

router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).send('User already exists');

    // Create a new user
    user = new User({
      email,
      password,
    });
    await user.save();
    res.status(201).json({message:"User created successfully."});
  } catch (error) {
    res.status(500).send('Server error');
  }
});


  router.post('/add-card',verify, async (req, res) => {
    try {
      console.log(req.user)
      const newCard = new Card({...req.body,userId:req.user.id});
      await newCard.save();
      res.status(201).send('Card added');
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

router.get('/applications',verify, async (req, res) => {
  try {
    const applications = await Application.find().populate('cardId');
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Approve/Reject an application
router.put('/applications/:id',verify, async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json(application);
  } catch (err) {
    res.status(500).send('Server error');
  }
});
router.get('/applications/:id',verify, async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findOne({_id: id}).populate('cardId');
    res.status(200).json(application);
  } catch (err) {
    res.status(500).send('Server error');
  }
});
module.exports = router;
