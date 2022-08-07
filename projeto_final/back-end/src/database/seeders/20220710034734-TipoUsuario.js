"use strict";

module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "TipoUsuarios",
      [
        {
          id: 1,
          rotulo: "cliente",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          rotulo: "colaborador",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TipoUsuarios", null, {});
  },
};
