const { Strategy } = require('passport-local');
const AuthService = require('../../../services/authService');
const service = new AuthService();

//Done es la función que voy a usar para devolver error Ó usuario
//El 1er parámtro es error, el segundo el usuario
const LocalStrategy = new Strategy({
  usernameField: 'email', //para poder recibir en el HEADER el parámetro "email" en lugar de "username"
},
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
