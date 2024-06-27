const ProductSold = require('../models/productSold'); // Import the models
const Product = require('../models/product');
exports.createProductSold = async (req, res) => {
  try {
    const { item, quantity, totalCogs, totalPrice, productId } = req.body;

    // Find the product by its ID
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Create the ProductSold record
    const newProductSold = await ProductSold.create({
      item,
      quantity,
      totalCogs,
      totalPrice,
      ProductId: productId // Link the product sold to the product
    });

    // Update the product stock
    product.stock -= quantity;
    await product.save();

    res.status(201).json(newProductSold);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Read
exports.getAllProductSolds = async (req, res) => {
  try {
    const productSolds = await ProductSold.findAll();
    res.status(200).json(productSolds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductSoldById = async (req, res) => {
  const { id } = req.params;
  try {
    const productSold = await ProductSold.findByPk(id);
    if (!productSold) {
      res.status(404).json({ message: 'Product Sold not found' });
    } else {
      res.status(200).json(productSold);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateProductSold = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await ProductSold.update(req.body, {
      where: { id }
    });
    if (updated) {
      const updatedProductSold = await ProductSold.findByPk(id);
      res.status(200).json(updatedProductSold);
    } else {
      res.status(404).json({ message: 'Product Sold not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteProductSold = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await ProductSold.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Product Sold not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
