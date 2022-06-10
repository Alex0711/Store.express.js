'use strict';
const { DataTypes } = require('sequelize');
const { UserSchema, USER_TABLE } = require('./../models/userModel');
const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customerModel');
const { CategorySchema, CATEGORY_TABLE } = require('./../models/categoryModel');
const { ProductSchema, PRODUCT_TABLE } = require('./../models/productModel');
const { OrderSchema, ORDER_TABLE } = require('./../models/orderModel');
const { OrderProductSchema, ORDER_PRODUCT_TABLE } = require('./../models/orderProductModel');


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(ORDER_TABLE, {
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
  });
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE)
    await queryInterface.dropTable(CUSTOMER_TABLE)
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE)
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE)
  }
};
