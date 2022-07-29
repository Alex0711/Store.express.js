const jwt = require('jsonwebtoken');

const secret = 'myCat'; //esta es la llave necesaria para desifrar los tokens
//(debería ser una variable de entorno)

const payload = {
  sub: 1, //es mi forma de identificar al usuario
  role: 'customer', //acá defino el scope (los permisos que va a tener)
}

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
};

const token = signToken(payload, secret);
console.log(token);
