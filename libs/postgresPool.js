const { Pool } = require('pg');
const { config } = require('./../config/config');

const options = {}

if (config.isProd) { //si está en producción le paso connectionString y ssl
  options.connectionString = config.dbUrl;
  options.ssl = {
    rejectUnauthorized: false
  }
} else { //si está en dev, le paso solo connectionString
    // Protejo los datos
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options.connectionString = URI
}

const pool = new Pool(options);
module.exports = pool;
