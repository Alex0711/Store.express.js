const { Pool } = require('pg');
const { config } = require('./../config/config');

// Protejo los datos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const pool = new Pool({ connectionString: URI});

// const pool = new Pool({
//     host: 'localhost',
//     port: 5432,
//     user: 'ale',
//     password: 'admin123',
//     database: 'my_store'
//   });

module.exports = pool;
