'use strict';
const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customerModel');

module.exports = {
  async up (queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },

  async down (queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable(CUSTOMER_TABLE)
  }
};
