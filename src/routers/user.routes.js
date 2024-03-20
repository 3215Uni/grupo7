const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerUser.js');
const validation=require('../middlewares/validationMiddleware.js');
const userController = require('../controller/userController.js');




router.get('/login', userController.renderLogin);
//Formulario de Registro
router.get('/register', userController.renderRegister);
//Procesa el registro
router.post('/register', upload.single('avatar'),validation ,userController.processRegister);

module.exports = router;