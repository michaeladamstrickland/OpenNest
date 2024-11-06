'use strict';

/** @type {import('sequelize-cli').Migration} */
// migrations/xxxx-add-isImmediateTourAvailable-to-properties.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Properties', 'isImmediateTourAvailable', {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Properties', 'isImmediateTourAvailable');
  },
};
