const express = require('express');
const passport = require('passport');
const AuthService = require('../services/authService');

const service = new AuthService();

const router = express.Router();

router.post('/login',
//1er parámetro la estrategia, segundo le digo que no voy a manejar sesiones
  passport.authenticate('local', {session: false}),
//ahora el siguiente middleware ya tiene al usuario en req.user
  async (req, res, next) => {
    try {
      const user = req.user;
      const token = await service.signToken(user);
      res.json({
        user,
        token
      });
    } catch (err) {
      next(err)
    }
})

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendToken(email)
      res.json(rta);
    } catch (err) {
      next(err)
    }
})

router.post('/change-password',
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.changePassword(token, newPassword)
      res.json(rta);
    } catch (err) {
      next(err)
    }
})

module.exports = router;
