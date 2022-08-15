/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Enderecos', {
      fields: ['usuarioID'],
      type: 'foreign key',
      name: 'fk_usuario_endereco',
      references: {
        table: 'Usuarios',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Enderecos', 'fk_usuario_endereco');
  },
};
