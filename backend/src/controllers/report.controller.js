// backend/src/controllers/report.controller.js
const Form = require('../models/Form');
const FormItem = require('../models/FormItem');

exports.generarReporteDiario = async (req, res) => {
  try {
    const hoy = new Date().toISOString().split('T')[0];

    const formularios = await Form.find({ createdAt: { $gte: new Date(hoy) } })
      .populate('conductor')
      .populate('vehiculo');

    const reporte = await Promise.all(
      formularios.map(async (form) => {
        const itemsNoCumplen = await FormItem.countDocuments({
          formulario: form._id,
          estado: 'no cumple',
        });

        return {
          fecha: form.createdAt,
          conductor: form.conductor?.nombre || 'No disponible',
          vehiculo: form.vehiculo?.placa || 'No disponible',
          observaciones: form.observaciones || '',
          noCumplen: itemsNoCumplen,
          codigo: form._id,
        };
      })
    );

    res.json(reporte);
  } catch (error) {
    console.error('Error al generar el reporte:', error.message);
    res.status(500).json({ error: 'No se pudo generar el reporte' });
  }
};
