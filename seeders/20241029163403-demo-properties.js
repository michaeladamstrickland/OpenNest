'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Properties', [
      {
        title: 'Cozy Cottage',
        description: 'A cozy cottage with 2 bedrooms and 1 bath.',
        price: 250000,
        address: '123 Main St',
        city: 'Somewhere',
        state: 'NJ',
        zip: '08106',
        viewingOption: 'get code now',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Modern Villa',
        description: 'A modern villa with 4 bedrooms and 3 baths.',
        price: 750000,
        address: '456 Park Ave',
        city: 'Anytown',
        state: 'NJ',
        zip: '08080',
        viewingOption: 'schedule tour',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Properties', null, {});
  }
};
