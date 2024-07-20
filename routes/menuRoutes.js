const express = require('express');
const { getMenuItems, getMenuItem } = require('../controllers/menuController');
const router = express.Router();

router.get('/', getMenuItems);
router.get('/:id', getMenuItem);

module.exports = router;
