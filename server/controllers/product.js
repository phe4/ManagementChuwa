const Product =require('../models/Product');
const mongoose = require("mongoose");
const Vendor = require('../models/Vendor');

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const sortField = req.query.sortField || 'createdAt';
    const sortOrder = parseInt(req.query.sortOrder); // 'asc' ? 1 : -1;

    if (page <= 0) return res.status(400).json({ message: 'Invalid page' });
    if (pageSize <= 0) return res.status(400).json({ message: 'Invalid page size' });

    const data = await Product.find({})
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    const total = await Product.countDocuments({});
    const pages = Math.ceil(total / pageSize);

    res.status(200).json({
      data,
      page,
      pageSize,
      pages,
      total
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }
};

const createProduct = async (req, res) => {
  const params = req.body;
  const {
    productName,
    productDescription,
    category,
    price,
    quantity,
    imageUrl,
  } = params;
  const userId = req.user._id;
  try {
    const vendor = await Vendor.findById(userId);
    if (!vendor) {
      return res.status(400).json({ message: 'Vendor not found' });
    }
    const product = new Product({
      productName,
      productDescription,
      category,
      price,
      quantity,
      imageUrl,
      vendor: userId
    });
    await product.save();
    vendor.products.push(product._id);
    await vendor.save();

    res.status(200).json({ id: product._id, message: 'Create product successfully' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const userId = req.user._id;
    const params = req.body;
    const vendor = await Vendor.findById(userId);
    if (!vendor) {
      return res.status(400).json({ message: 'Vendor not found' });
    }
    // Check if the product belongs to the vendor
    if (!vendor.products.includes(id)) {
      return res.status(400).json({ message: 'Product not found' });
    }
    // const ID = new mongoose.Types.ObjectId(id);
    await Product.findByIdAndUpdate(id, params);
    res.status(200).json({ message: 'Update product successfully' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const ID = new mongoose.Types.ObjectId(id);
    const data = await Product.findById(ID);
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  getProduct
};
