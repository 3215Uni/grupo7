const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerUser.js');
const validation=require('../middlewares/validationMiddleware.js');
const userController = require('../controller/userController.js');
const guestMiddleware=require('../middlewares/guestMiddleware.js');




router.get('/login', guestMiddleware, userController.login);
router.post('/login', userController.loginProcess);
router.get('/logout', userController.logout);
//Formulario de Registro
router.get('/register',guestMiddleware ,userController.register);
//Procesa el registro
router.post('/register', upload.single('avatar'),validation ,userController.processRegister);


module.exports = router;