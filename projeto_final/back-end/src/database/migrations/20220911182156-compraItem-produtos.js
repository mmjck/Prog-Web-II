/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('CompraItems', {
      fields: ['produtoId'],
      type: 'foreign key',
      name: 'fk_compraItem_produto',
      references: {
        table: 'Produtos',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'CompraItems',
      'fk_compraItem_produto'
    );
  },
};
