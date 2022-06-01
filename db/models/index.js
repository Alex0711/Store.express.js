const { User, UserSchema } = require('./userModel');
const { Product, ProductSchema } = require('./productModel');


function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  //Entiendo que el init crea la tabla, le paso el schema y la configuración
}

module.exports = setupModels;
