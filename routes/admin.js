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
    if (!user) return res.status(404).send({message:'Admin not found.'});

    const isMatch = await user.checkPassword(password);
    if (!isMatch) return res.status(400).send({message:'Invalid credentials.'});

    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1d' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send({message:err.message});
  }
});

router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).send({message:'User already exists.'});
    user = new User({
      email,
      password,
    });
    await user.save();
    res.status(201).json({message:"User created successfully."});
  } catch (err) {
    res.status(500).send({message:err.message});
  }
});


  router.post('/add-card',verify, async (req, res) => {
    try {
      console.log(req.user)
      const newCard = new Card({...req.body,userId:req.user.id});
      await newCard.save();
      res.status(201).send({message:"Card added successfully."});
    } catch (err) {
      console.log(err)
      res.status(500).send({message:err.message});
    }
  });

router.get('/applications',verify, async (req, res) => {
  try {
    const applications = await Application.find().populate('cardId');
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).send({message:err.message});
  }
});

// Approve/Reject an application
router.put('/applications/:id',verify, async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json({message:"update successfully."});
  } catch (err) {
    res.status(500).send({message:err.message});
  }
});

module.exports = router;
