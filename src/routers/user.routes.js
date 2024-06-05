const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerUser.js');
const validation=require('../middlewares/validationMiddleware.js');
const validationUpdate=require('../middlewares/validationUpdate.js');
const userController = require('../controller/userController.js');
const guestMiddleware=require('../middlewares/guestMiddleware.js');




router.get('/login', guestMiddleware, userController.login);
router.post('/login', userController.loginProcess);
router.get('/logout', userController.logout);
router.get('/profile/:user',userController.profile);
router.get('/editUser/:userName',userController.update);
router.put('/editUser/:userName',upload.single('avatar'),validationUpdate ,userController.updateUser)

//Formulario de Registro
router.get('/register',guestMiddleware ,userController.register);
//Procesa el registro
router.post('/register', upload.single('avatar'),validation ,userController.processRegister);


module.exports = router;