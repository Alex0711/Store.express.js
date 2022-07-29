require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev', //Cuando lo mande a heroku necesito NODE_ENV.
  //Entiendo que me dice si estoy en dev o producción, se lo usa en las config de la db

  isProd: process.env.NODE_ENV === 'production',//Si está en heroku, me va a enviar NODE_ENV
  //Y sino va a ser false
  port: process.env.PORT || 3000, //Heroku también me va a dar un puerto
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
}

module.exports = { config }
