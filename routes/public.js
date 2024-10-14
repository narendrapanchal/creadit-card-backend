const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

router.get('/cards', async (req, res) => {
  try {
    const { category, bank } = req.query;
    let query = {};
    if (category) query.category = category;
    if (bank) query.bank = bank;

    const cards = await Card.find(query);
    res.status(200).json(cards); 
  } catch (err) {
    res.status(500).send({message:err.message});
  }
});
router.get('/cards/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const cards = await Card.findOne({_id:id});
    res.status(200).json(cards); 
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server error');
  }
});

module.exports = router;