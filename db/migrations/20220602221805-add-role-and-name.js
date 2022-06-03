'use strict';
const { UserSchema, USER_TABLE } = require('./../models/userModel');

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
    await queryInterface.addColumn(USER_TABLE, 'name', UserSchema.name);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'role');
    await queryInterface.removeColumn(USER_TABLE, 'name');
  }
};
