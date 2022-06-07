const { Model, DataTypes, Sequelize} = require('sequelize');
const { USER_TABLE } = require('./userModel')

const CUSTOMER_TABLE = 'customers' //el nombre de la tabla que estoy creando

const CustomerSchema = {
  id: {
    allowNull: false, //si puede estar vacío
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name'
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  creditCard: {
    type: DataTypes.STRING,
    field: 'credit_card'
  },
  address: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: { //en JS nos manejamos con mayus para separar palabras
    allowNull: false,
    type: DataTypes.DATE, //una fecha
    field: 'create_at', //Pero en la db las separamos con guion bajo
    defaultValue: Sequelize.NOW //por defecto, el momento en que se crea
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

//Le agrego todas las propiedades de Models. Es donde está cargado SQL
class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as: 'user'});
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId'
    })
  }
  static config(sequelize) {
    return {
      sequelize, //Esto es para conectar con la db
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer', //Con este nombre lo va a guardar dentro de models de sequalize
      timestamps: false //para que no agregue el momento de creación y actualización (los agrega por defecto)
    }
  }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer};
