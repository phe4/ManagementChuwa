const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/requireRole');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

// POST /api/orders — customer places order
router.post('/', auth, requireRole('Customer'), async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    if (!shippingAddress) {
      return res.status(400).json({ message: 'shippingAddress is required' });
    }

    const customer = await Customer.findById(req.user._id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const cart = await Cart.findById(customer.cart).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Check all items have sufficient quantity
    for (const item of cart.items) {
      if (!item.product) {
        return res.status(400).json({ message: 'A cart item references a missing product' });
      }
      if (item.product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient quantity for product: ${item.product.name}`,
        });
      }
    }

    // Group items by vendor
    const byVendor = {};
    for (const item of cart.items) {
      const vendorId = item.product.owner.toString();
      if (!byVendor[vendorId]) byVendor[vendorId] = [];
      byVendor[vendorId].push(item);
    }

    // Create one Order per vendor and decrement quantities
    const orders = [];
    for (const [vendorId, items] of Object.entries(byVendor)) {
      const orderItems = items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      }));
      const totalPrice = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

      const order = new Order({
        customer: customer._id,
        vendor: vendorId,
        items: orderItems,
        totalPrice,
        shippingAddress,
      });
      await order.save();
      orders.push(order);

      // Decrement product quantities
      for (const item of items) {
        await Product.findByIdAndUpdate(item.product._id, {
          $inc: { quantity: -item.quantity },
        });
      }
    }

    // Clear cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders — customer views their orders
router.get('/', auth, requireRole('Customer'), async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
