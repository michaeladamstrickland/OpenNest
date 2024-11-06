// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('open_nest_real_estate', 'root', 'Poker247$$', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
