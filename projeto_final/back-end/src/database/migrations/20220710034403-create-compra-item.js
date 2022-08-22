/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CompraItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      compraId: {
        type: Sequelize.INTEGER,
      },
      produtoId: {
        type: Sequelize.INTEGER,
      },
      quantidade: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CompraItems');
  },
};
('use strict');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CompraItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      compraId: {
        type: Sequelize.INTEGER,
      },
      produtoId: {
        type: Sequelize.INTEGER,
      },
      quantidade: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CompraItems');
  },
};
