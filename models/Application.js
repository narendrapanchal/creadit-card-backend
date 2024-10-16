const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  cardId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "card", 
    required: true 
  },
  status: { 
    type: String, 
    default: "pending", 
    enum: ["pending", "approved", "rejected"] 
  },
  personalInfo: {
    name: { 
      type: String, 
      required: true, 
      minlength: [3, 'Name must be at least 3 characters long.'] // Minimum length for name
    },
    income: { 
      type: Number, 
      required: true, 
      min: [10000, 'Income must be at least 10,000.'] // Minimum income validation
    },
    email: { 
      type: String, 
      required: true, 
      validate: {
        validator: function(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Email regex validation
        },
        message: 'Email must be valid.'
      }
    },
    phone: { 
      type: Number, 
      required: true,
      validate: {
        validator: function(v) {
          return /^\d{10}$/.test(v); // Validates Indian phone number (10 digits)
        },
        message: 'Phone number must be a valid 10-digit Indian number.'
      }
    },
    aadhar: { 
      type: Number, 
      required: true, 
      validate: {
        validator: function(v) {
          return /^\d{12}$/.test(v); // Validates 12-digit Aadhar number
        },
        message: 'Aadhar must be a valid 12-digit number.'
      }
    },
    pancard: { 
      type: String, 
      required: true, 
      validate: {
        validator: function(v) {
          return /^[A-Z]{5}\d{4}[A-Z]{1}$/.test(v); // Validates PAN card format
        },
        message: 'Pancard must be a valid 10-character PAN format.'
      }
    },
    address: { 
      type: String, 
      required: true, 
      minlength: [5, 'Address must be at least 5 characters long.'] // Minimum length for address
    },
    pincode: { 
      type: Number, 
      required: true, 
      validate: {
        validator: function(v) {
          return /^\d{6}$/.test(v); // Validates 6-digit Pincode
        },
        message: 'Pincode must be a valid 6-digit code.'
      }
    },
  },
},{
  timestamps: true,
  versionKey: false,
});
module.exports = mongoose.model("application", applicationSchema);



