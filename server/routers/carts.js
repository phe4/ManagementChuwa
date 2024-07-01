const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  getAllProductsFromCart,
  addOneProductToCart,
  updateOneProductInCart,
  deleteOneProductInCart
} = require('../controllers/cart');

router.get('/', auth, getAllProductsFromCart);

router.post('/:productId', auth, addOneProductToCart);

router.patch('/:productId', auth, updateOneProductInCart);

router.delete('/:productId', auth, deleteOneProductInCart);

module.exports = router;
