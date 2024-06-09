const express = require('express');
const router = express.Router();

const productsController = require('../../controller/api/productsController');

//router.post('/', usersController.create);
router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProduct);

module.exports = router;