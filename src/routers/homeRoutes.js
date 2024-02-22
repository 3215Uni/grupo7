const express = require('express');
const app = express();
const path = require('node:path');
const router = express.Router();



const homeController = require('../controller/homeController');
router.get('/', homeController.renderHome);


router.get('/search', homeController.Search)


module.exports = router;