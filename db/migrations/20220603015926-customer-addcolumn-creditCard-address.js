'use strict';
const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customerModel');

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn(CUSTOMER_TABLE, 'credit_card', CustomerSchema.creditCard);
     await queryInterface.addColumn(CUSTOMER_TABLE, 'address', CustomerSchema.address);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn(CUSTOMER_TABLE, 'credit_card');
     await queryInterface.removeColumn(CUSTOMER_TABLE, 'address');
  }
};
