const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: String,
  isSubscribed: {
    type: Boolean,
    default: true,
  },
  preferences: {
    promotions: { type: Boolean, default: true },
    newArrivals: { type: Boolean, default: true },
    priceDrops: { type: Boolean, default: true },
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  unsubscribedAt: Date,
});

module.exports = mongoose.model('Newsletter', newsletterSchema);