const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userType: {
    type: DataTypes.ENUM('buyer', 'seller'),
    allowNull: false,
  },
  preApprovalLimit: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
});

module.exports = User;
