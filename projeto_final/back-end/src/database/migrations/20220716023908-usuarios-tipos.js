'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Usuarios', {
      fields: ['tipoUsuarioId'],
      type: 'foreign key',
      name: 'tipoUsuarioFk',
      references:{
        table: 'TipoUsuarios',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
    
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeConstraint('Usuarios','tipoUsuarioId');
  }
};
