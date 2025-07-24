// backend/src/routes/history.routes.js
const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history.controller');
const { protegerRuta, requiereRol } = require('../middlewares/auth');

// Ruta para obtener el historial (solo administradores)
router.get('/', protegerRuta, requiereRol('administrador'), historyController.obtenerHistorial);

module.exports = router;
