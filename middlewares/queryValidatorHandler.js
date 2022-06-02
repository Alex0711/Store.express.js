const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

function queryValidatorHandler () {
  return async (req, res, next) => {
    const data = req.body;
    const user = await models.User.findOne({ where: { email: data.email }});

    if (user) {
      return next(boom.conflict('User already exists'));
    }
    next()
  }
}

module.exports = queryValidatorHandler;
