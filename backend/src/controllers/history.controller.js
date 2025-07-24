// backend/src/controllers/history.controller.js
exports.obtenerHistorial = async (req, res) => {
  try {
    const historial = [
      { id: 1, mensaje: 'Usuario A creó un formulario', fecha: new Date() },
      { id: 2, mensaje: 'Usuario B eliminó un vehículo', fecha: new Date() },
    ];
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial' });
  }
};
