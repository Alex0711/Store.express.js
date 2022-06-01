const express = require('express');
const UserService = require('../services/usersService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/userSchema');
const boom = require('@hapi/boom')

const service = new UserService()
const router = express.Router();


//Query parameters... Estos son opcionales
router.get('/',
  async (req, res, next) => { //  /users?limit=10&offset=200
    const users = await service.find();
    res.json(users)
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id)
  if (user) {
    res.json(user)
  } else {
    res.send('No se encontró el usuario')
  }
})
//Hecho en clase!
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser)
    } catch (err) {
      next(err)
    }
})

router.put('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
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
    res.status(201).json({
      message: 'Usuario Eliminado',
      deleted
    })
  } catch (err) {
    res.status(404).json({
      message: err.message
    })
  }
})

module.exports = router;

