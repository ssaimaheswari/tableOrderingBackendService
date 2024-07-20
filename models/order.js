const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  table_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'confirm'
  }
});

module.exports = { Order };
