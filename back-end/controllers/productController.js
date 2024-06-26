// controllers/productController.js
const Product = require('../models/product');

// Create
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const newProduct = await Product.create({
      name,
      price,
      category
    });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Product.update(req.body, {
      where: { id }
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Product.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
