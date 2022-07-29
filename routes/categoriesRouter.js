const express = require('express');
const CategoryService = require('../services/categoryService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/categorySchema');
const { checkApiKey, checkRole } = require('./../middlewares/authHandler');
const passport = require('passport');

const service = new CategoryService()
const router = express.Router();


//Query parameters... Estos son opcionales
router.get('/', checkApiKey,
  async (req, res, next) => { //  /users?limit=10&offset=200
    try {
      const users = await service.find();
      res.json(users)
    } catch (err) {
      next(err);
    }
})

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (err) {
      next(err)
    }
})

//Hecho en clase!
router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  validatorHandler(createCategorySchema, 'body'),
  // queryValidatorHandler(models.User, 'email'), para evitar doble consulta
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory)
    } catch (err) {
      next(err)
    }
})

router.put('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
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

module.exports = router;
