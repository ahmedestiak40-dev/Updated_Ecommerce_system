const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email: String,
  quantity: {
    type: Number,
    default: 1,
  },
  status: {
    type: String,
    enum: ['waiting', 'notified', 'purchased', 'cancelled'],
    default: 'waiting',
  },
  notifiedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

waitlistSchema.index({ productId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Waitlist', waitlistSchema);