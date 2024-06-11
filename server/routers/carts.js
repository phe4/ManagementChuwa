const express = require('express');
const router = express.Router();

const {
  getAllProductsFromCart,
  addOneProductToCart,
  updateOneProductInCart,
  deleteOneProductInCart
} = require('../controllers/cart');

router.get('/:userId', getAllProductsFromCart);

router.post('/:userId/products/:productId', addOneProductToCart);

router.put('/:userId/products/:productId', updateOneProductInCart);

router.delete('/:userId/products/:productId', deleteOneProductInCart);

module.exports = router;
