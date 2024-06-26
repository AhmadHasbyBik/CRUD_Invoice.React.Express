// routes/productSoldRoute.js
const express = require('express');
const router = express.Router();
const productSoldController = require('../controllers/productSoldController');

// CRUD operations for ProductSold
router.post('/productsold', productSoldController.createProductSold);
router.get('/productsold', productSoldController.getAllProductSolds);
router.get('/productsold/:id', productSoldController.getProductSoldById);
router.put('/productsold/:id', productSoldController.updateProductSold);
router.delete('/productsold/:id', productSoldController.deleteProductSold);

module.exports = router;
