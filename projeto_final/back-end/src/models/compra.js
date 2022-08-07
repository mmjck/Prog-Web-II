"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  Compra.init(
    {
      usuarioId: DataTypes.INTEGER,
      data: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Compra",
    }
  );
  return Compra;
};
