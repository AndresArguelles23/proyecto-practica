// backend/src/models/Form.js
const { Schema, model } = require('mongoose');

const formSchema = new Schema({
  conductor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehiculo: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'completado', 'tardio'],
    default: 'pendiente'
  },
  observaciones: {
    type: String
  },
  firma: {
    type: String, // Se almacenará la ruta del archivo o base64 si lo deseas
    required: true
  },
  codigoJustificativo: {
    type: String
  }
}, { timestamps: true });

module.exports = model('Form', formSchema);
