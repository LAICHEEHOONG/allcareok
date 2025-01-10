const mongoose = require('mongoose');

const checkoutSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate sessions
  },
  clientReferenceId: {
    type: String,
    required: false, // Optional based on your app logic
  },
  customerDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  amountTotal: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'unpaid', 'failed'],
    required: true,
  },
  paymentIntentId: {
    type: String,
    required: true,
  },
  successUrl: {
    type: String,
    required: false, // Optional if you don’t need to store it
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('CheckoutSession', checkoutSessionSchema);