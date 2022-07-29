const { Model, DataTypes, Sequelize} = require('sequelize');

const USER_TABLE = 'users' //el nombre de la tabla que estoy creando

const UserSchema = {
  id: {
    allowNull: false, //si puede estar vacío
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'recovery_token'
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer '
  },
  createdAt: { //en JS nos manejamos con mayus para separar palabras
    allowNull: false,
    type: DataTypes.DATE, //una fecha
    field: 'create_at', //Pero en la db las separamos con guion bajo
    defaultValue: Sequelize.NOW //por defecto, el momento en que se crea
  }
}

//Le agrego todas las propiedades de Models. Es donde está cargado SQL
class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    })
  }
  static config(sequelize) {
    return {
      sequelize, //Esto es para conectar con la db
      tableName: USER_TABLE,
      modelName: 'User', //Con este nombre lo va a guardar dentro de models de sequalize
      timestamps: false //para que no agregue el momento de creación y actualización (los agrega por defecto)
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User};
