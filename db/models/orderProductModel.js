const { Model, DataTypes, Sequelize} = require('sequelize');
const { ORDER_TABLE } = require('./orderModel');
const { PRODUCT_TABLE } = require('./productModel');

const ORDER_PRODUCT_TABLE = 'orders_products'


const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: { //en JS nos manejamos con mayus para separar palabras
    allowNull: false,
    type: DataTypes.DATE, //una fecha
    field: 'create_at', //Pero en la db las separamos con guion bajo
    defaultValue: Sequelize.NOW //por defecto, el momento en que se crea
  },
}

//Le agrego todas las propiedades de Models. Es donde está cargado SQL
class OrderProduct extends Model {
  static associate(models) {
    // this.belongsTo(models.Customer, {as: 'customer'})
  }
  static config(sequelize) {
    return {
      sequelize, //Esto es para conectar con la db
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct', //Con este nombre lo va a guardar dentro de models de sequalize
      timestamps: false //para que no agregue el momento de creación y actualización (los agrega por defecto)
    }
  }
}

module.exports = { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct};
