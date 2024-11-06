// models/Offer.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Offer extends Model {}

  Offer.init(
    {
      offerAmount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('submitted', 'accepted', 'rejected'),
        defaultValue: 'submitted',
      },
    },
    {
      sequelize,
      modelName: 'Offer',
      timestamps: true,
    }
  );

  return Offer;
};
