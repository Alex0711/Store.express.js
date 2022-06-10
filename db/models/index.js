const { User, UserSchema } = require('./userModel');
const { Customer, CustomerSchema } = require('./customerModel');
const { Category, CategorySchema } = require('./categoryModel');
const { Product, ProductSchema } = require('./productModel');
const { Order, OrderSchema } = require('./orderModel');
const { OrderProduct, OrderProductSchema } = require('./orderProductModel')


function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  //Entiendo que el init crea la tabla, le paso el schema y la configuración

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;
