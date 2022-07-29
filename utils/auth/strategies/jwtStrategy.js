const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config')


const options = {
//le digo que saque el toquen desde el header
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//Y le paso el secreto
  secretOrKey: config.jwtSecret,
}

//Creo una nueva instancia, a la cual le paso las opciones y me va a devolver
//el payload y una funcion done
const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

module.exports = JwtStrategy;
