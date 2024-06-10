const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  getProduct
} = require('../controllers/product');

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/create', createProduct);
router.patch('/:id', updateProduct);

module.exports = router;
