const express = require('express');
const router = express.Router();

//para recibir parámetros más complejos
router.get('/:categoryId/products/:productId', (req, res) => {
  const { productId } = req.params
  const { categoryId } = req.params
  res.json({
    categoryId,
    productId
  })
})

module.exports = router;
