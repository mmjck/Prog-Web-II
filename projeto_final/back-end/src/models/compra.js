'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here

      // define association here
      this.belongsTo(models.Usuario);

      // define association here
      this.belongsTo(models.Endereco);
    }
  }
  Compra.init(
    {
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      enderecoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      data: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Compra',
    }
  );
  return Compra;
};
