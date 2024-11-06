const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Property = sequelize.define('Property', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.DECIMAL(15, 2),
  address: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  zip: DataTypes.STRING,
  viewingOption: DataTypes.ENUM('get code now', 'schedule tour'),
});

module.exports = Property;
