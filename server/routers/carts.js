const express = require('express');
const router = express.Router();

const {
  getAllProductsFromCart
} = require('../controllers/cart');

router.get('/:id', getAllProductsFromCart);

module.exports = router;
