const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

function queryValidatorHandler (table, field) {
  return async (req, res, next) => {
    const data = req.body;

    if (data[field]) {
      const user = await table.findOne({ where: { [field] : data[field] }})
      console.log(user)
      if (user) {
        return next(boom.conflict('User already exists'));
      }
    }
    console.log('pasó el query')
    next()
  }
}

module.exports = queryValidatorHandler;
