const Product =require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const data = await Product.find();
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(400).send(e.message);
  }
};

module.exports = {
  getAllProducts
};
