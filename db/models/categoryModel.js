const { Model, DataTypes, Sequelize} = require('sequelize');

const CATEGORY_TABLE = 'categories'


const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(25),
    unique: true
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING()
  },
  createdAt: { //en JS nos manejamos con mayus para separar palabras
    allowNull: false,
    type: DataTypes.DATE, //una fecha
    field: 'create_at', //Pero en la db las separamos con guion bajo
    defaultValue: Sequelize.NOW //por defecto, el momento en que se crea
  }
}

//Le agrego todas las propiedades de Models. Es donde está cargado SQL
class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId'
    })
  }
  static config(sequelize) {
    return {
      sequelize, //Esto es para conectar con la db
      tableName: CATEGORY_TABLE,
      modelName: 'Category', //Con este nombre lo va a guardar dentro de models de sequalize
      timestamps: false //para que no agregue el momento de creación y actualización (los agrega por defecto)
    }
  }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category};
