const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: "card" },
  status: { type: String, default: "pending", enum:["pending","approved","rejected"]}, // pending, approved, rejected
  personalInfo: {
    name: { type: String, required: true },
    income: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    aadhar: { type: Number, required: true },
    pancard: { type: String, required: true },
    address: { type: String, required: true },
    pincode:{type:Number,required:true}
  },
});
module.exports = mongoose.model("application", applicationSchema);



