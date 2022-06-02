const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const setupModels = require('./../db/models');

// Protejo los datos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI, {
  dialect: "postgres", //acá le digo que voy a trabajar con postgres
  logging: true, //Es para ver en la consola el comando que se ejecuta en SQL
});

setupModels(sequelize);

module.exports = sequelize;
