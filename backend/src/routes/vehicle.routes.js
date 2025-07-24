const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const { protegerRuta, requiereRol } = require('../middlewares/auth');

// GET /api/vehicles
router.get('/', protegerRuta, async (_req, res) => {
  try {
    const vehiculos = await Vehicle.find();
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener vehículos' });
  }
});

// POST /api/vehicles
router.post('/', protegerRuta, requiereRol('admin'), async (req, res) => {
  try {
    const nuevoVehiculo = new Vehicle(req.body);
    const vehiculoGuardado = await nuevoVehiculo.save();
    res.status(201).json(vehiculoGuardado);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear vehículo' });
  }
});

// PUT /api/vehicles/:id
router.put('/:id', protegerRuta, requiereRol('admin'), async (req, res) => {
  try {
    const vehiculoActualizado = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!vehiculoActualizado) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }
    res.json(vehiculoActualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar vehículo' });
  }
});

// DELETE /api/vehicles/:id
router.delete('/:id', protegerRuta, requiereRol('admin'), async (req, res) => {
  try {
    const vehiculoEliminado = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehiculoEliminado) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }
    res.json({ mensaje: 'Vehículo eliminado' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar vehículo' });
  }
});

module.exports = router;
