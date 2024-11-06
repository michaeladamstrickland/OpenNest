const sequelize = require('../config/database');
const User = require('./User');
const Property = require('./Property');
const Tour = require('./Tour');
const Offer = require('./Offer');

// Define relationships
User.hasMany(Tour);
Tour.belongsTo(User);

Property.hasMany(Tour);
Tour.belongsTo(Property);

User.hasMany(Offer, { foreignKey: 'buyerId' });
Offer.belongsTo(User, { foreignKey: 'buyerId' });

Property.hasMany(Offer);
Offer.belongsTo(Property);

module.exports = { sequelize, User, Property, Tour, Offer };
