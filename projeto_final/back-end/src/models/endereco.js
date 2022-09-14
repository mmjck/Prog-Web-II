'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Endereco extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      this.belongsTo(models.Usuario);

      // define association here
      this.hasMany(models.Compra);
    }
  }
  Endereco.init(
    {
      usuarioID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      logradouro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bairro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cidade: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uf: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cep: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Endereco',
    }
  );
  return Endereco;
};
