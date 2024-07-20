const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const { Order } = require('./order');
const { MenuItem } = require('./menuItem');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
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

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = { OrderItem };
