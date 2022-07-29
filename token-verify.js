const jwt = require('jsonwebtoken');
const { config } = require('./config/config')

const secret = config.jwtSecret; //esta es la llave necesaria para desifrar los tokens
//(debería ser una variable de entorno)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQwLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTg4MDA2Mzd9.VtP7a8SdG13yBGo6mfxHzrLUYgw6AQOfF0u8oLmg_jQ'

function veifyToken(token, secret) {
  return jwt.verify(token, secret);
};

const payload = veifyToken(token, secret);
console.log(payload);
