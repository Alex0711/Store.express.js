require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev', //Cuando lo mande a heroku necesito NODE_ENV
  port: process.env.PORT || 3000, //Heroku también me va a dar un puerto
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
}

module.exports = { config }
