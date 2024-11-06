// models/Offer.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Offer = sequelize.define('Offer', {
  offerAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('submitted', 'accepted', 'rejected'),
    defaultValue: 'submitted',
  },
}, {
  timestamps: true,
});

module.exports = Offer;
