const express = require('express')

const productsRouter = require('./productsRouter')
const home = require('./homeRouter')
const categoriesRouter = require('./categoriesRouter')
const userRouter = require('./usersRouter')


function routerApi (app) {
    const router = express.Router();
    app.use('/api/v1', router)
  router.use(`/`, home)
  router.use(`/products`, productsRouter)
  router.use(`/categories`, categoriesRouter)
  router.use(`/users`, userRouter)
}

module.exports = routerApi;