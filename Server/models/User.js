const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init(
    {
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      userType: { type: DataTypes.ENUM('buyer', 'seller'), allowNull: false },
      preApprovalLimit: { type: DataTypes.DECIMAL(15, 2), allowNull: true },
    },
    { sequelize, modelName: 'User', timestamps: true }
  );
  return User;
};