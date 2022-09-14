/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Compras', {
      fields: ['enderecoId'],
      type: 'foreign key',
      name: 'fk_compra_endereco',
      references: {
        table: 'Enderecos',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Compras', 'fk_compra_endereco');
  },
};
