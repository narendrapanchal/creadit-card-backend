const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

// Get all cards
router.get('/cards', async (req, res) => {
  try {
    const { category, bank } = req.query;
    let query = {};
    if (category) query.category = category;
    if (bank) query.bank = bank;

    // Fetch the cards based on the query
    const cards = await Card.find(query);// Fetch all cards from the database
    res.status(200).json(cards); // Send the cards in JSON format
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server error');
  }
});
router.get('/cards/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the cards based on the query
    const cards = await Card.findOne({_id:id});// Fetch all cards from the database
    res.status(200).json(cards); // Send the cards in JSON format
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server error');
  }
});

module.exports = router;