'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tours', [
      {
        scheduledDate: new Date(new Date().setDate(new Date().getDate() + 2)), // Tour scheduled for two days from now
        status: 'pending',
        userId: 1, // Buyer ID
        propertyId: 1, // Property ID (Cozy Cottage)
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tours', null, {});
  }
};
