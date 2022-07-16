'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('TipoUsuarios', [
      {
        id: 1,
        rotulo: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        rotulo: 'colaborador',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
  ], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('TipoUsuarios', null, {});

  }
};