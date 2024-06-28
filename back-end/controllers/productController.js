const Product = require('../models/product');
const ProductSold = require('../models/productSold');
const Invoice = require('../models/invoice');
const upload = require('../middleware/multer'); // Multer middleware yang sudah di-setup
const multer = require('multer');
const fs = require('fs');
const path = require('path');

exports.createProduct = async (req, res) => {
  try {
    // Upload file gambar terlebih dahulu menggunakan multer
    upload.single('image')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Akan menangkap error dari multer (misalnya, ukuran file terlalu besar)
        return res.status(400).json({ error: err.message });
      } else if (err) {
        // Akan menangkap error lain yang dihasilkan oleh multer
        return res.status(400).json({ error: err.message });
      }

      // Setelah berhasil upload file, dapatkan data dari req.body
      const { name, price, stock, category } = req.body;

      // Pastikan semua field yang diperlukan ada
      if (!name || !price || !stock || !category) {
        return res.status(400).json({ error: "All fields are required." });
      }

      let image = '';
      if (req.file) {
        image = req.file.filename;
      }

      // Buat produk baru
      const newProduct = await Product.create({
        name,
        price,
        stock,
        category,
        image: image || ''
      });

      res.status(201).json(newProduct);
    });
  } catch (err) {
    // Tangani error dari Sequelize
    if (err.name === 'SequelizeValidationError') {
      // Handle validation error
      const errors = err.errors.map(error => error.message);
      return res.status(400).json({ error: errors.join(', ') });
    } else {
      // Tangani error lainnya
      res.status(500).json({ error: err.message });
    }
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
    // Ambil entri produk yang akan diperbarui
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Upload file gambar terlebih dahulu menggunakan multer
    upload.single('image')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Akan menangkap error dari multer (misalnya, ukuran file terlalu besar)
        return res.status(400).json({ error: err.message });
      } else if (err) {
        // Akan menangkap error lain yang dihasilkan oleh multer
        return res.status(400).json({ error: err.message });
      }

      // Ambil data dari req.body
      const { name, price, stock, category } = req.body;

      // Persiapkan objek untuk pembaruan
      const updateData = {
        name,
        price,
        stock,
        category
      };

      // Jika ada file gambar baru yang diunggah
      if (req.file) {
        // Hapus gambar lama dari sistem file
        if (product.image) {
          const oldImagePath = path.join(__dirname, '..', 'public', 'images', product.image);
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error('Failed to delete old image:', err.message);
            }
          });
        }
        // Tambahkan gambar baru ke objek pembaruan
        updateData.image = req.file.filename;
      }

      // Perbarui entri produk di database
      const [updated] = await Product.update(updateData, {
        where: { id }
      });

      if (updated) {
        const updatedProduct = await Product.findByPk(id);
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Hapus gambar dari sistem file
    if (product.image) {
      const imagePath = path.join(__dirname, '..', 'public', 'images', product.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Failed to delete image:', err.message);
        }
      });
    }

    // Cari semua entri di ProductSolds yang terkait dengan produk ini
    const productSolds = await ProductSold.findAll({
      where: { ProductId: id }
    });

    // Hapus entri terkait di tabel invoices
    for (const productSold of productSolds) {
      await Invoice.destroy({
        where: { ProductSoldId: productSold.id }
      });
    }

    // Hapus entri terkait di tabel productsolds
    await ProductSold.destroy({
      where: { ProductId: id }
    });

    // Hapus entri produk dari database
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