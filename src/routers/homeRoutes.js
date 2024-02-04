const express = require('express');
const app = express();
const path = require('node:path');
const router = express.Router();



const homeController = require('../controller/homeController');
router.get('/', homeController.renderHome);


module.exports = router;