const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const { Cart } = require('./cart');
const { MenuItem } = require('./menuItem');

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cart,
      key: 'id'
    }
  },
  menu_item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MenuItem,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

module.exports = { CartItem };
