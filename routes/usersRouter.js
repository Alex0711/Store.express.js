const express = require('express');
const UserService = require('../services/usersService')

const service = new UserService()
const router = express.Router();


//Query parameters... Estos son opcionales
router.get('/', async (req, res) => { //  /users?limit=10&offset=200
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

router.post('/', (req, res) => {
  const body = req.body;
  service.create(body);
  res.status(201).json(body)
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const update = service.update(id, body);
  if (updated) {
    res.status(201).send('Updated')
  } else {
    res.status(404).send('User Not Found')
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

