const Product = require('../models/Product');
const Vendor = require('../models/Vendor');
const mongoose = require("mongoose");
const Joi = require("joi");

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

  if (!req.user || req.user === 'anonymous') return res.status(401).json({ message: 'No token, authorization denied' });

  const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    category: Joi.string(),
    price: Joi.number(),
    quantity: Joi.number(),
    image: Joi.string(),
    owner: Joi.string()
  })

  try {
    const ID = new mongoose.Types.ObjectId(req.user._id);
    const vendor = await Vendor.findById(ID);
    if (!vendor) return res.status(400).json({ message: 'No a valid vendor' });

    params.owner = req.user._id;
    await schema.validateAsync(params);

    const product = new Product(params);
    await product.save();
    res.status(200).json({ id: product._id, message: 'Create product successfully' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }
};

const updateProduct = async (req, res) => {
  if (!req.user || req.user === 'anonymous') return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const {id} = req.params;
    const params = req.body;

    const ID = new mongoose.Types.ObjectId(id);
    const product = await Product.findById(ID);

    if (product.owner.toString() !== req.user._id) return res.status(401).json({ message: 'Authorization denied' });

    if (params.hasOwnProperty('owner')) delete params['owner'];
    await Product.findByIdAndUpdate(ID, params);
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
