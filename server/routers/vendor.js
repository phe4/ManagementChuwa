const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/requireRole');
const Product = require('../models/Product');
const Order = require('../models/Order');

// All vendor routes require auth + Vendor role
router.use(auth, requireRole('Vendor'));

// GET /api/vendor/products — list own products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user._id });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// POST /api/vendor/products — create product
router.post('/products', async (req, res) => {
  try {
    const { name, description, category, price, quantity, image } = req.body;
    const product = new Product({
      name,
      description,
      category,
      price,
      quantity,
      image,
      owner: req.user._id,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/vendor/products/:id — update product (verify ownership)
router.patch('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.owner.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updates = req.body;
    delete updates.owner; // prevent ownership change
    await Product.findByIdAndUpdate(req.params.id, updates);
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/vendor/products/:id — delete product (verify ownership)
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.owner.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// GET /api/vendor/orders — list orders containing vendor's products
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({ vendor: req.user._id })
      .populate('customer')
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/vendor/orders/:id — update order status
router.patch('/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Delivering', 'Delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.vendor.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
