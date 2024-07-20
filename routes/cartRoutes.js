const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const router = express.Router();

router.get('/', authenticate, getCart);
router.post('/', authenticate, addToCart);
router.delete('/', authenticate, removeFromCart);

module.exports = router;
