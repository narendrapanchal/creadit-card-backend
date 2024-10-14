const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  name: { type: String, required: true },
  src:{type:String,required:true},
  limit: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Travel Cards', 'Corporate Cards', 'Reward Cards', 'Premium Cards'], 
  },
  bank:{
    type: String,
    required: true,
    enum: ['Bank of America', 'Chase', 'Wells Fargo', 'Citibank'], // Enum for predefined bank names
  },
  pros:[{type:String}],
  cons:[{type:String}]
});
module.exports = mongoose.model('card', cardSchema);




