const express = require('express');
const passport = require('passport');

const OrderService = require('../services/orderService');

const router = express.Router();
const service = new OrderService();

router.get('/my-orders',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const orders = await service.findByUser(req.user.sub)
      res.json(orders)
    } catch (err) {
      next(err)
    }
})

module.exports = router;
