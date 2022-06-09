'use strict';
const { UserSchema, USER_TABLE } = require('./../models/userModel');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'name')
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.addColumn(USER_TABLE, 'name', UserSchema.name);
  }
};
