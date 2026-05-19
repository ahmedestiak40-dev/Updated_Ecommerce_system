const mongoose = require('mongoose');

const priceAlertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  desiredPrice: {
    type: Number,
    required: true,
  },
  currentPrice: Number,
  status: {
    type: String,
    enum: ['active', 'triggered', 'cancelled'],
    default: 'active',
  },
  notifiedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PriceAlert', priceAlertSchema);