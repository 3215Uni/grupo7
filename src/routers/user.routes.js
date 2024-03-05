const express = require('express');
const router = express.Router();


const userController = require('../controller/userController.js');



router.get('/login', userController.renderLogin);
//Formulario de Registro
router.get('/register', userController.renderRegister);
//Procesa el registro
router.post('/register', userController.processRegister);

module.exports = router;