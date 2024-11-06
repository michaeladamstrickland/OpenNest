const { Sequelize } = require('sequelize');

// Database configuration
const sequelize = new Sequelize('open_nest_real_estate', 'root', 'Poker247$$', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Disable logging
});

module.exports = sequelize;
