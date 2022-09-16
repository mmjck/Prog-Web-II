'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      this.hasMany(models.CompraItem);
    }
  }
  Produto.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 50],
            msg: 'O nome do produto precisa conter entre 3 e 50 caracteres',
          },
        },
      },
      preco: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Produto',
    }
  );
  return Produto;
};
