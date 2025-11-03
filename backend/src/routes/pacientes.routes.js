const pacientesController = require('../controllers/pacientes.controller');

const express = require('express');
const validate = require('../middlewares/auth');
const { validaAdministradores, validaAtendentes } = require("../middlewares/validaCargo");

const pacientesRoutes = express.Router();

pacientesRoutes.post('/pacientes', validate, validaAtendentes, pacientesController.createPaciente);
pacientesRoutes.get('/pacientes', validate, pacientesController.getAllPacientes);
pacientesRoutes.get('/pacientes/:id', validate, pacientesController.getPacienteById);
pacientesRoutes.put('/pacientes/:id', validate, validaAtendentes, pacientesController.updatePaciente);
pacientesRoutes.delete('/pacientes/:id', validate, validaAtendentes, pacientesController.deletePaciente);
pacientesRoutes.get('/pacientes/total/medico', validate, validaAdministradores, pacientesController.pacientesByMedico);

module.exports = pacientesRoutes;