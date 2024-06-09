const express = require('express');
const router = express.Router();

const usersController = require('../../controller/api/usersController');

//router.post('/', usersController.create);
router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUser)

module.exports = router;