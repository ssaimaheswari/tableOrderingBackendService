const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { getUser } = require('../controllers/userController');
const router = express.Router();

router.get('/me', authenticate, getUser);

module.exports = router;
