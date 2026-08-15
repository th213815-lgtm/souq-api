const express = require('express');
const { addToCart } = require('../controllers/cartController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/items', protect, authorize('customer'), addToCart);

module.exports = router;