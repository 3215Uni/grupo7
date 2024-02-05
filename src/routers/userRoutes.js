const express = require('express');
const router = express.Router();


const userController = require('../controller/userController.js');



router.get('/login', userController.renderLogin);

router.get('/register', userController.renderRegister);

module.exports = router;