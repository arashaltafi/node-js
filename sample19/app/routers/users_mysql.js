const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersControllers_mysql');

router.get("/", userController.usersList);

router.post("/", userController.addUser);

router.get('/:id', userController.getUser);

router.delete('/:id', userController.removeUser);

router.patch('/:id', userController.updateUser);

module.exports = router;