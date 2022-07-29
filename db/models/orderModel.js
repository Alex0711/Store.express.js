const { Model, DataTypes, Sequelize} = require('sequelize');
const { CUSTOMER_TABLE } = require('./customerModel')

const ORDER_TABLE = 'orders'


const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  pay: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  delivered: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
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
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      try {
        if (this.items.length > 0) {
          return this.items.reduce((total, item) => {
            return total + (item.price * item.OrderProduct.amount)
          }, 0)
        }
        return 0;
      } catch (error) {
        return 0
      }
    }
  },
}

//Le agrego todas las propiedades de Models. Es donde está cargado SQL
class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {as: 'customer'});
    this.belongsToMany(models.Product, { //le paso la tabla con la que quiero conectar
      as: 'items',
      through: models.OrderProduct, //Es latabla a travez de la cual me conecto
      foreignKey: 'orderId',
      otherKey: 'productId'
    })
  }
  static config(sequelize) {
    return {
      sequelize, //Esto es para conectar con la db
      tableName: ORDER_TABLE,
      modelName: 'Order', //Con este nombre lo va a guardar dentro de models de sequalize
      timestamps: false //para que no agregue el momento de creación y actualización (los agrega por defecto)
    }
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order};
