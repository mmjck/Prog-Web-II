/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Compras', {
      fields: ['usuarioID'],
      type: 'foreign key',
      name: 'fk_usuario_compra',
      references: {
        table: 'Usuarios',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Compras', 'fk_usuario_compra');
  },
};
