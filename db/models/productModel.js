const { Model, DataTypes, Sequelize} = require('sequelize');

const PRODUCT_TABLE = 'products'


const ProductSchema = {
  id: {
    allowNull: false,
    autoIncremente: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(25),
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createdAt: { //en JS nos manejamos con mayus para separar palabras
    allowNull: false,
    type: DataTypes.DATE, //una fecha
    field: 'create_at', //Pero en la db las separamos con guion bajo
    defaultValue: Sequelize.NOW //por defecto, el momento en que se crea
  }
}

//Le agrego todas las propiedades de Models. Es donde está cargado SQL
class Product extends Model {
  static associate() {
    //
  }
  static config(sequelize) {
    return {
      sequelize, //Esto es para conectar con la db
      tableName: PRODUCT_TABLE,
      modelName: 'User', //Con este nombre lo va a guardar dentro de models de sequalize
      timestamps: false //para que no agregue el momento de creación y actualización (los agrega por defecto)
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product};
