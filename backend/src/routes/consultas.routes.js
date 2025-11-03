const consultasController = require('../controllers/consultas.controller');

const express = require('express');
const validate = require('../middlewares/auth');
const { validaAdministradores, validaAtendentes } = require("../middlewares/validaCargo");

const consultasRoutes = express.Router();

consultasRoutes.post('/consultas', validate, validaAtendentes, consultasController.createConsulta);
consultasRoutes.get('/consultas', validate, consultasController.getAllConsultas);
consultasRoutes.get('/consultas/:id', validate, consultasController.getConsultaById);
consultasRoutes.put('/consultas/:id', validate, validaAtendentes, consultasController.updateConsulta);
consultasRoutes.delete('/consultas/:id', validate, validaAtendentes, consultasController.deleteConsulta);
consultasRoutes.get('/consultas/total/role', validate, validaAdministradores, consultasController.consultasByRole);
consultasRoutes.get('/consultas/listagem/geral', validate, validaAdministradores, consultasController.listagemGeral);

module.exports = consultasRoutes;