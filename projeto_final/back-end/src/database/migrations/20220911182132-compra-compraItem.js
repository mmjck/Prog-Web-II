/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('CompraItems', {
      fields: ['compraId'],
      type: 'foreign key',
      name: 'fk_compra_compraItem',
      references: {
        table: 'Compras',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'CompraItems',
      'fk_compra_compraItem'
    );
  },
};
