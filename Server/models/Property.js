// models/Property.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Property extends Model {}

  Property.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      viewingOption: {
        type: DataTypes.ENUM('get code now', 'schedule tour', 'open'),
        allowNull: true,
        defaultValue: 'open'
    },
    isImmediateTourAvailable: {    // New field
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    },
    {
      sequelize,
      modelName: 'Property',
      timestamps: true,
    }
  );

  return Property;
};



