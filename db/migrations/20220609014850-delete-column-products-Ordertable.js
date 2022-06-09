'use strict';
const { OrderSchema, ORDER_TABLE } = require('./../models/orderModel');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(ORDER_TABLE, 'products')
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.addColumn(ORDER_TABLE, 'products', OrderSchema.products);
  }
};
