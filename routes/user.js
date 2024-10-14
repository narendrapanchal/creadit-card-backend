// routes/user.js
const express = require('express');
const router = express.Router();
const Application = require('../models/Application.js');

// Apply for a credit card
router.post('/apply', async (req, res) => {
  try {
    const { cardId, personalInfo } = req.body;
    const newApplication = new Application({ cardId, personalInfo });
    await newApplication.save();
    res.status(201).send({message:'Application submitted'});
  } catch (err) {
    res.status(500).send({message:err.message});
  }
});

// View application status
router.get('/application/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('cardId');
    res.status(200).json(application);
  } catch (err) {
    res.status(500).send({message:err.message});
  }
});

module.exports = router;
