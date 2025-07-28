const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const FormItem = require('../models/FormItem');
const { protegerRuta } = require('../middlewares/auth');

// POST /api/forms - Crear formulario con ítems
router.post('/', protegerRuta, async (req, res) => {
  try {
    const {
      conductor,
      vehiculo,
      observaciones,
      estado,
      firma,
      codigoJustificativo,
      items
    } = req.body;

    const nuevoFormulario = new Form({
      conductor,
      vehiculo,
      observaciones,
      estado,
      firma,
      codigoJustificativo
    });

    const formularioGuardado = await nuevoFormulario.save();

    const itemsConFormulario = items.map((item) => ({
      formulario: formularioGuardado._id,
      descripcion: item.descripcion || item.nombre,
      estado: item.estado
    }));

    const itemsGuardados = await FormItem.insertMany(itemsConFormulario);

    res.status(201).json({
      mensaje: 'Formulario y ítems guardados correctamente',
      formulario: formularioGuardado,
      items: itemsGuardados
    });
  } catch (error) {
    console.error('❌ Error al guardar formulario:', error.message);
    res.status(500).json({ error: 'Error al guardar el formulario' });
  }
});

// GET /api/forms/:id - Obtener formulario y sus ítems
router.get('/:id', protegerRuta, async (req, res) => {
  try {
    const formulario = await Form.findById(req.params.id)
      .populate('conductor')
      .populate('vehiculo');

    if (!formulario) {
      return res.status(404).json({ error: 'Formulario no encontrado' });
    }

    const items = await FormItem.find({ formulario: formulario._id });

    res.json({
      formulario,
      items
    });
  } catch (error) {
    console.error('❌ Error al obtener formulario:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
