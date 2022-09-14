'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompraItem extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      this.belongsTo(models.Produto);
    }
  }
  CompraItem.init(
    {
      compraId: { type: DataTypes.INTEGER, allowNull: false },
      produtoId: { type: DataTypes.INTEGER, allowNull: false },
      quantidade: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'CompraItem',
    }
  );
  return CompraItem;
};
