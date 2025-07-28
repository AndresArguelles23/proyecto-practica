// backend/src/controllers/form.controller.js
const Form = require('../models/Form');
const FormItem = require('../models/FormItem');

exports.crearFormulario = async (req, res) => {
  try {
    const { conductor, vehiculo, observaciones, firma, codigoJustificativo, items } = req.body;

    const nuevoFormulario = new Form({
      conductor,
      vehiculo,
      observaciones,
      firma,
      codigoJustificativo,
    });

    const formularioGuardado = await nuevoFormulario.save();

    const itemsConFormulario = items.map((item) => ({
      ...item,
      formulario: formularioGuardado._id,
    }));

    await FormItem.insertMany(itemsConFormulario);

    res.status(201).json({ formulario: formularioGuardado });
  } catch (error) {
    console.error('Error al crear formulario:', error.message);
    res.status(400).json({ error: 'Datos inválidos' });
  }
};

exports.obtenerFormularios = async (_req, res) => {
  try {
    const formularios = await Form.find()
      .populate('conductor')
      .populate('vehiculo');

    res.json(formularios);
  } catch (error) {
    console.error('Error al obtener formularios:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
