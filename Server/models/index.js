// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Property = require('./Property')(sequelize, Sequelize.DataTypes);
const Tour = require('./Tour')(sequelize, Sequelize.DataTypes);
const Offer = require('./Offer')(sequelize, Sequelize.DataTypes);

console.log('User:', User);
console.log('Property:', Property);
console.log('Tour:', Tour);
console.log('Offer:', Offer);

// Set up associations
User.hasMany(Tour, { foreignKey: 'userId' });
Property.hasMany(Tour, { foreignKey: 'propertyId' });

User.hasMany(Offer, { as: 'Buyer', foreignKey: 'buyerId' });
Property.hasMany(Offer, { foreignKey: 'propertyId' });

Tour.belongsTo(User, { foreignKey: 'userId' });
Tour.belongsTo(Property, { foreignKey: 'propertyId' });

Offer.belongsTo(User, { as: 'Buyer', foreignKey: 'buyerId' });
Offer.belongsTo(Property, { foreignKey: 'propertyId' });

// Export models and sequelize instance
module.exports = {
  sequelize,
  Sequelize,
  User,
  Property,
  Tour,
  Offer,
};
