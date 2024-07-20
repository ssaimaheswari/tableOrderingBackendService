const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'guest',
    validate: {
      isIn: [['guest', 'boss']]
    }
  }
});

module.exports = { User };
