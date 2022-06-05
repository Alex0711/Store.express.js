const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(25);
const lastName = Joi.string().min(3).max(25);
const phone = Joi.string().length(10).pattern(/^[0-9]+$/);
const creditCard = Joi.string().min(5).max(30);
const address = Joi.string().min(10).max(255);
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(4).max(25);

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  creditCard: creditCard,
  address: address.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  })
})

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  creditCard: creditCard,
  address: address,
  userId,
})

const getCustomerSchema = Joi.object({
  id: id.required()
})


module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
