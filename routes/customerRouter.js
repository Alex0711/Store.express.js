const express = require('express');
const customerService = require('../services/customerService');
const validatorHandler = require('../middlewares/validatorHandler');
const queryValidatorHandler = require('../middlewares/queryValidatorHandler');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('../schemas/customerSchema');
const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize');

const service = new customerService()
const router = express.Router();


//Query parameters... Estos son opcionales
router.get('/',
  async (req, res, next) => { //  /users?limit=10&offset=200
    const customers = await service.find();
    res.json(customers)
})

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (err) {
      next(err)
    }
})
//Hecho en clase!
router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  // queryValidatorHandler(models.Customer, 'phone')
  //Comentada para que entre en el sequelizeValidatorHandler del index.js
  async (req, res, next) => {
    try {
      const body = req.body;
      const customer = await service.create(body);
      res.status(201).json(customer)
    } catch (err) {
      next(err)
    }
})

router.put('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  queryValidatorHandler(),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const update = await service.update(id, body);
      res.status(201).json(update)
    } catch (err) {
      next(err)
    }
})

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await service.delete(id)
      res.status(201).json({
        deleted
      })
    } catch (err) {
      res.status(404).json({
        message: err.message
      })
    }
  })

module.exports = router;

