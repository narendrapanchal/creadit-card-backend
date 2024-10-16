const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  name: {
    type: String,
    required: true,
    minlength: [3, 'Name must be at least 3 characters long.'], // Minimum length for name
  },
  src: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        console.log("v-----",v)
        return /^https?:\/\/.*\.(jpg|jpeg|png|gif)$/.test(v.trim());
      },
      message: 'Source must be a valid image URL.',
    },
  },
  limit: {
    type: Number,
    required: true,
    min: [10000, 'Limit must be at least 10,000.'], // Minimum limit validation
  },
  category: {
    type: String,
    required: true,
    enum: ['Travel Cards', 'Corporate Cards', 'Reward Cards', 'Premium Cards'],
  },
  bank: {
    type: String,
    required: true,
    enum: ['Bank of America', 'Chase', 'Wells Fargo', 'Citibank'], // Enum for predefined bank names
  },
  pros: [{
    type: String,
    validate: {
      validator: function (v) {
        return v.length  >5; // Minimum length for each pro
      },
      message: 'Each pro must be at least 5 characters long.',
    },
  }],
  cons: [{
    type: String,
    validate: {
      validator: function (v) {
        return v.length > 5; // Minimum length for each con
      },
      message: 'Each con must be at least 5 characters long.',
    },
  }],
},
{
  timestamps: true,
  versionKey: false,
});
module.exports = mongoose.model('card', cardSchema);




