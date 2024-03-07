'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Clients',
      [
        {
          name: 'thales',
          email: 'thales@gmail.com',
          phone: 12345678901,
          coordinate_x: 1,
          coordinate_y: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clients', null, {});
  },
};
