const usersController = require('../controllers/users.controller');

const express = require('express');
const validate = require('../middlewares/auth');
const { validaAtendentes } = require("../middlewares/validaCargo");

const usersRoutes = express.Router();

usersRoutes.post('/login', usersController.login);
usersRoutes.post('/users', validate, usersController.cadastro);
usersRoutes.get('/users', validate, validaAtendentes, usersController.getAllUsers);
usersRoutes.get('/users/:id', validate, validaAtendentes, usersController.getUserById);
usersRoutes.put('/users/:id', validate, validaAtendentes, usersController.updateUser);
usersRoutes.delete('/users/:id', validate, validaAtendentes, usersController.deleteUser);

module.exports = usersRoutes;