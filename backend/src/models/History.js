// backend/src/models/History.js
const { Schema, model } = require('mongoose');

const historySchema = new Schema({
  formulario: {
    type: Schema.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  acciones: [{
    tipo: { type: String, required: true }, // ejemplo: 'creación', 'modificación', 'firma'
    fecha: { type: Date, default: Date.now },
    usuario: { type: Schema.Types.ObjectId, ref: 'User' },
    detalle: { type: String }
  }]
}, { timestamps: true });

module.exports = model('History', historySchema);
