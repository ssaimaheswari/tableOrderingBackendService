const { MenuItem } = require('../models');

exports.getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
};

exports.getMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu item' });
  }
};