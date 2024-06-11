const Cart = require('../models/Cart');
const Product = require('../models/Product');
const TestUser = require('../models/TestUser');

const calculateTotalPrice = (items) => {
  return items.reduce(async (total, item) => {
    const product = await Product.findById(item.product);
    total+=product.price*item.quantity;
  }, 0);
};

const createCart = async (userId) => {
  const cart = new Cart({
    userId: userId,
    items: [],
    totalPrice: 0.00,
  });

  try {
    const result = await cart.save();
    console.log('Cart created:', result);
  } catch (err) {
    console.log('Error creating cart:', err);
  }
};


const getAllProductsFromCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const addOneProductToCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {

    const user = await TestUser.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: 'User or Product not found.' });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user.' });
    }

    const existingProductIndex = cart.items.findIndex(item => item.product.equals(productId));

    if (existingProductIndex !== -1) {
      cart.items[existingProductIndex].quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }

    cart.items.forEach(element => {
      console.log(element);
    });
    cart.totalPrice += product.price;

    await cart.save();

    res.status(201).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const updateOneProductInCart = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  console.log(req.body);
  
  try {
    if (!quantity || quantity < 1) {
      return res.status(404).json({ message: 'Please input valid quantity.' });
    }

    const user = await TestUser.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: 'User or Product not found.' });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user.' });
    }

    const existingProductIndex = cart.items.findIndex(item => item.product.equals(productId));

    if (existingProductIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }
    const oldQuantity = cart.items[existingProductIndex].quantity;
    cart.items[existingProductIndex].quantity = quantity;

    cart.totalPrice += product.price * (quantity-oldQuantity);

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const deleteOneProductInCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {

    const user = await TestUser.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: 'User or Product not found.' });
    }


    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const existingProductIndex = cart.items.findIndex(item => item.product.equals(productId));

    if (existingProductIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }

    const oldQuantity = cart.items[existingProductIndex].quantity;

    const updatedItems = cart.items.filter(item => !item.product.equals(productId));
    cart.items = updatedItems;


    cart.totalPrice -= product.price *oldQuantity;

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCart,
  getAllProductsFromCart,
  addOneProductToCart,
  updateOneProductInCart,
  deleteOneProductInCart
};
