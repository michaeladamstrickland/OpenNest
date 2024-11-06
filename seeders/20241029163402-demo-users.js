'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'buyer@example.com',
        password: 'password123',
        userType: 'buyer',
        preApprovalLimit: 500000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'seller@example.com',
        password: 'password123',
        userType: 'seller',
        preApprovalLimit: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
