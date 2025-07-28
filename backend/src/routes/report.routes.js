// src/routes/report.routes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { protegerRuta, requiereRol } = require('../middlewares/auth');

// Ruta para generar un reporte (solo administrador)
router.get('/', protegerRuta, requiereRol('administrador'), reportController.generarReporteDiario);



module.exports = router;
