const mongoose = require('mongoose');

const abandonedCartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  sessionId: {
    type: String,
    required: true,
  },
  email: String,
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number,
    image: String,
  }],
  totalAmount: Number,
  couponCode: String,
  reminderSent: {
    type: Boolean,
    default: false,
  },
  reminderSentAt: Date,
  recoveredAt: Date,
  status: {
    type: String,
    enum: ['active', 'recovered', 'expired', 'reminded'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // Auto delete after 7 days (7 * 86400)
  },
});

module.exports = mongoose.model('AbandonedCart', abandonedCartSchema);