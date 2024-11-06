// models/Tour.js
module.exports = (sequelize, DataTypes) => {
    const Tour = sequelize.define("Tour", {
      propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Properties',
          key: 'id'
        },
        onDelete: 'CASCADE',  // Ensures deletion if related property is removed
        onUpdate: 'CASCADE'
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'SET NULL', // Sets userId to NULL if the related user is removed
        onUpdate: 'CASCADE'
      },
      scheduledDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
        defaultValue: 'pending',
        allowNull: false
      },
    });

    // Associations
    Tour.associate = (models) => {
      Tour.belongsTo(models.Property, { foreignKey: 'propertyId' });
      Tour.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return Tour;
};
