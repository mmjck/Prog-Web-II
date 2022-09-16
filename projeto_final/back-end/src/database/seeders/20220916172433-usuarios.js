'use strict';

module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Usuarios',
      [
        {
          email: 'admin@admin.com',
          nome: 'Jackson Matheus dos Santos',
          //senha: senha123
          senha: '$2a$08$XDaKV7tFvbDQMFNRV7TFB.eCQfsWM1T.SJOX3M/pAmTLiF5gjseqq',
          tipoUsuarioId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'maria@gmail.com',
          nome: 'Maria das dores',
          //senha: senha123
          senha: '$2a$08$XDaKV7tFvbDQMFNRV7TFB.eCQfsWM1T.SJOX3M/pAmTLiF5gjseqq',
          tipoUsuarioId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  },
};
