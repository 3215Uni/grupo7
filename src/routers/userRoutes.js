const express = require('express');
const app = express();
const path = require('node:path');
const router = express.Router();


const userController = require('../controller/userController.js');
router.get('/login', userController.renderLogin);


module.exports = router;