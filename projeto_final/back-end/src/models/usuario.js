'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.TipoUsuario);
    }
  }
  Usuario.init({
    tipoUsuarioId: DataTypes.INTEGER,
    nome:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3,50],
          msg: "O nome do usuario precisa conter entre 3 a 50 caracteress",
        }, 
      },
    },
    email:{ 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Por favor, digite um email válido.",
        },
      },
    },
    senha:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};