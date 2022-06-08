const express = require('express')

const productsRouter = require('./productsRouter')
const home = require('./homeRouter')
const categoriesRouter = require('./categoriesRouter')
const userRouter = require('./usersRouter')
const customerRouter = require('./customerRouter')
const orderRouter = require('./ordersRouter')


function routerApi (app) {
    const router = express.Router();
    app.use('/api/v1', router)
  router.use(`/`, home)
  router.use(`/products`, productsRouter)
  router.use(`/categories`, categoriesRouter)
  router.use(`/users`, userRouter)
  router.use(`/customers`, customerRouter)
  router.use(`/orders`, orderRouter)
}

module.exports = routerApi;
