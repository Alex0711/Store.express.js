'use strict';
const { UserSchema, USER_TABLE } = require('./../models/userModel');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
      field: 'recovery_token'
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  }
};
