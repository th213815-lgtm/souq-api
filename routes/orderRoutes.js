const express = require('express');
const { createOrder } = require('../controllers/orderController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, authorize('customer'), createOrder);

module.exports = router;