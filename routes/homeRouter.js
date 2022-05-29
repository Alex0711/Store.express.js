const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('1er server en express // HOME!!!')
})

module.exports = router;
