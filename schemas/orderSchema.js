const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const pay = Joi.boolean();
const products = Joi.array();
const delivered = Joi.boolean();


const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  pay: pay.required(),
  products: products.required(),
  delivered: delivered.required(),
})

const updateOrderSchema = Joi.object({
  customerId,
  pay,
  products,
  delivered,
})

const getOrderSchema = Joi.object({
  id: id.required()
})


module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema }
