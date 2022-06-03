function logErrors (err, req, res, next) {
  console.error(err);
  next(err) //va a llegar si o si a un middleware de tipo error
}

function errorHandler (err, req, res, next) { //Acá agarra todo tipo de errores
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler (err, req, res, next) { //Acá agarra solo booms
  if (err.isBoom){
    const { output } = err //capturo el output del error
    //y ahora mando un statusCode dinámico más la información del error
    return res.status(output.statusCode).json(output.payload);
  }
  next(err)
}

function sequelizeErrorHandler (err, req, res, next) {
  if (err.message === "Validation error"){
    const { errors } = err
    return res.status(409).json(errors);
  }
  next(err)
}

module.exports = { logErrors, errorHandler, boomErrorHandler, sequelizeErrorHandler }
