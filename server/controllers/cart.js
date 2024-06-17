const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');
const Customer = require('../models/Customer');

const calculateTotalPrice = (items) => {
  return items.reduce(async (total, item) => {
    const product = await Product.findById(item.product);
    total+=product.price*item.quantity;
  }, 0);
};

const createCart = async (userId) => {
  const cart = new Cart({
    items: [],
    totalPrice: 0.00,
  });

  try {
    const user = await User.findById(userId);
    const customer = await Customer.findById(user.instance);
    customer.cart = cart._id;
    await cart.save();
    await customer.save();
    res.status(200).json(cart);
  } catch (err) {
    console.log('Error creating cart:', err);
  }
};


const getAllProductsFromCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    const customer = await Customer.findById(user.instance);
    const cart = await Cart.findById(customer.cart);
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

    const user = await User.findById(userId);
    const customer = await Customer.findById(user.instance);
    const product = await Product.findById(productId);

    if (!customer || !product) {
      return res.status(404).json({ message: 'Customer or Product not found.' });
    }

    let cart = await Cart.findById(customer.cart);

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

    const user = await User.findById(userId);
    const customer = await Customer.findById(user.instance);
    const product = await Product.findById(productId);

    if (!customer || !product) {
      return res.status(404).json({ message: 'Customer or Product not found.' });
    }

    let cart = await Cart.findById(customer.cart);

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

    const user = await User.findById(userId);
    const customer = await Customer.findById(user.instance);
    const product = await Product.findById(productId);

    if (!customer || !product) {
      return res.status(404).json({ message: 'Customer or Product not found.' });
    }

    const cart = await Cart.findById(customer.cart);
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
