const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const { protegerRuta, requiereRol } = require('../middlewares/auth');

// GET /api/vehicles
router.get('/', protegerRuta, async (req, res) => {
  try {
    const vehiculos = await Vehicle.find();
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener vehículos' });
  }
});

module.exports = router;
