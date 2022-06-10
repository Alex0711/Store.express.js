const express = require('express');
const ProductsService = require('../services/productsServices');
const validatorHandler = require('../middlewares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema} = require('../schemas/productSchema');
const boom = require('@hapi/boom');

const router = express.Router();
const service = new ProductsService();

router.get('/filter', (req, res) => {
  res.send('Soy un filtro :)')
});

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query)
      res.status(200).json(products)
    } catch(error) {
      next(error);
    }
})

//para recibir un solo dato en el parametro
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params //const id = req.params.id;
    try {
      const product = await service.findOne(id)
      res.status(200).json(product)
    }
    catch (err) {
      next(err)
    }
})

//Método POST
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;  //la info del req llega en el body. Acá la capturo
    const newProduct = await service.create(body);
    res.status(201).json(newProduct)
})

//Método PATCH... Si lo cambio por put funciona igual. Es solo convención
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const newProduct = await service.update(id, body)
    res.status(201).json(newProduct)
  }
  catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

//Método PUT... La idea es recibir en el body el objeto completo
router.put('/:id',
  validatorHandler(updateProductSchema, 'body'),
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const newProduct = await service.update(id, body)
    if (newProduct) {
      res.status(201).json(newProduct)
    }
  })

//Método DELETE
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await service.delete(id)
    res.json({
      message: 'deleted',
      id
  })
  } catch (error) {
    next(error)
  }
})

module.exports = router;
