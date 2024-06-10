const express = require('express');
const router = express.Router();

const apiMarcas = require('../../controller/api/apiMarcas');

//router.post('/', usersController.create);
router.get('/', apiMarcas.getMarcas);
router.get('/:id', apiMarcas.getMarca);

module.exports = router;