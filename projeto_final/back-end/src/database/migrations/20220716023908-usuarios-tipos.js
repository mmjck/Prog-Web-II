'use strict';

module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Usuarios', {
      fields: ['tipoUsuarioId'],
      type: 'foreign key',
      name: 'tipoUsuarioFk',
      references: {
        table: 'TipoUsuarios',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    });
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Usuarios', 'tipoUsuarioFk');
  },
};
