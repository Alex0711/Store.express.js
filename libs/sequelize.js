const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const options = {
  dialect: "postgres", //acá le digo que voy a trabajar con postgres
  logging: config.isProd ? false : true, //Es para ver en la consola el comando que se ejecuta en SQL. Sólo funciona en dev
}

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    }
  }
}

const sequelize = new Sequelize(config.dbUrl, {options});

setupModels(sequelize);

module.exports = sequelize;
