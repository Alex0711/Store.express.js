const boom = require('@hapi/boom');

`Voy a recibir como parámetros el schema que voy a validar y una propiedad
que me va a decir donde encontrar la información (POST, GET, PUT, DELETE).`

function validatorHandler (schema, property) {
  return (req, res, next) => { //Ahora vamos a construir un middleware de forma dinamica
    const data = req[property]; //la info puede estar body, params o query

    const { error } = schema.validate(data, { abortEarly: false }); //Verifico que la información que recibo coincide con el schema. Si no coincide, crea una propidad llamada error
    if (error) { //Si hay algun error de validación, elevo un error tipo boom
      return next(boom.badRequest(error)); //para saber que error nos manda el schema
    }
    next()  //Si no hay error, todo bien! Seguimos adelante
  }
}

module.exports = validatorHandler;
