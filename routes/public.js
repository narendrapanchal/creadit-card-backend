const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

router.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
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
    res.status(500).send({message: err.message});
  }
});

module.exports = router;