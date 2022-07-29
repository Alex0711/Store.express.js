const express = require('express');
const OrderService = require('../services/orderService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/orderSchema');
const { checkRole } = require('../middlewares/authHandler')
const passport = require('passport');

const service = new OrderService()
const router = express.Router();


//Query parameters... Estos son opcionales
router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin', 'customer '),
  async (req, res, next) => { //  /users?limit=10&offset=200
    try {
      const orders = await service.find(req.user);
      res.json(orders)
    } catch (err) {
      next(err);
    }
})

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (err) {
      next(err)
    }
})

router.post('/',
  passport.authenticate('jwt', { session: false }),
  // queryValidatorHandler(models.User, 'email'), para evitar doble consulta
  async (req, res, next) => {
    try {
      const newCategory = await service.create(req.user.sub);
      res.status(201).json(newCategory)
    } catch (err) {
      next(err)
    }
})

router.put('/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  // queryValidatorHandler(models.User, 'email'),
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

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.delete(id)
    res.status(201).json(deleted)
  } catch (err) {
    res.status(404).json({
      message: err.message
    })
  }
})

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  // queryValidatorHandler(models.User, 'email'), para evitar doble consulta
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem)
    } catch (err) {
      next(err)
    }
})

module.exports = router;
