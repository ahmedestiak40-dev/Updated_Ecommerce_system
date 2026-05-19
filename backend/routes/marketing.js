const express = require('express');
const router = express.Router();
const AbandonedCart = require('../models/AbandonedCart');
const PriceAlert = require('../models/PriceAlert');
const Waitlist = require('../models/Waitlist');
const Newsletter = require('../models/Newsletter');
const Product = require('../models/Product');
const { authMiddleware } = require('../middleware/auth');

// Track abandoned cart
router.post('/abandoned-cart', async (req, res) => {
  try {
    const { sessionId, items, totalAmount, email, userId } = req.body;
    
    let cart = await AbandonedCart.findOne({ sessionId, status: 'active' });
    
    if (cart) {
      cart.items = items;
      cart.totalAmount = totalAmount;
      cart.email = email || cart.email;
      await cart.save();
    } else {
      cart = new AbandonedCart({
        sessionId,
        userId,
        email,
        items,
        totalAmount,
      });
      await cart.save();
    }
    
    res.json({ message: 'Cart tracked', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create price alert
router.post('/price-alert', authMiddleware, async (req, res) => {
  try {
    const { productId, desiredPrice } = req.body;
    const product = await Product.findById(productId);
    
    const existingAlert = await PriceAlert.findOne({
      userId: req.userId,
      productId,
      status: 'active',
    });
    
    if (existingAlert) {
      return res.status(400).json({ message: 'Price alert already exists for this product' });
    }
    
    const alert = new PriceAlert({
      userId: req.userId,
      productId,
      desiredPrice,
      currentPrice: product.price,
    });
    
    await alert.save();
    res.json({ message: 'Price alert created', alert });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Join waitlist
router.post('/waitlist', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    
    if (product.stock > 0) {
      return res.status(400).json({ message: 'Product is in stock' });
    }
    
    const existing = await Waitlist.findOne({
      productId,
      userId: req.userId,
      status: 'waiting',
    });
    
    if (existing) {
      return res.status(400).json({ message: 'Already on waitlist' });
    }
    
    const waitlist = new Waitlist({
      productId,
      userId: req.userId,
      email: req.user.email,
      quantity,
    });
    
    await waitlist.save();
    res.json({ message: 'Added to waitlist', waitlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Subscribe to newsletter
router.post('/newsletter/subscribe', async (req, res) => {
  try {
    const { email, name, preferences } = req.body;
    
    let subscriber = await Newsletter.findOne({ email });
    
    if (subscriber) {
      subscriber.isSubscribed = true;
      subscriber.preferences = preferences || subscriber.preferences;
      await subscriber.save();
    } else {
      subscriber = new Newsletter({ email, name, preferences });
      await subscriber.save();
    }
    
    res.json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get price alerts for user
router.get('/price-alerts', authMiddleware, async (req, res) => {
  try {
    const alerts = await PriceAlert.find({ userId: req.userId, status: 'active' })
      .populate('productId', 'name price image');
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get waitlist for user
router.get('/waitlist', authMiddleware, async (req, res) => {
  try {
    const waitlist = await Waitlist.find({ userId: req.userId, status: 'waiting' })
      .populate('productId', 'name price image');
    res.json(waitlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;