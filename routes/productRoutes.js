const express = require('express');
const router = express.Router();
const { getProducts, createProduct, deleteProduct } = require('../controllers/productController');
const { protect, authorize } = require('../Middlewares/authMiddleware');

// المسارات (Routes)
router.get('/', getProducts);
router.post('/', protect, authorize('seller', 'admin'), createProduct);
router.delete('/:id', protect, authorize('seller', 'admin'), deleteProduct);

module.exports = router;