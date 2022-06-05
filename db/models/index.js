const { User, UserSchema } = require('./userModel');
const { Product, ProductSchema } = require('./productModel');
const { Customer, CustomerSchema } = require('./customerModel');



function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  //Entiendo que el init crea la tabla, le paso el schema y la configuración

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
}

module.exports = setupModels;
