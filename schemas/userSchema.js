const Joi = require('joi');

const id = Joi.string().uuid();
const email = Joi.string().email()
const password = Joi.string().min(8).max(16)

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required()
})

const updateUserSchema = Joi.object({
  email: email,
  password: password
})

const getUserSchema = Joi.object({
  id: id.required()
})


module.exports = { createUserSchema, updateUserSchema, getUserSchema }
