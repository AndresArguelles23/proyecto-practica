// backend/src/models/Report.js
const { Schema, model } = require('mongoose');

const reportSchema = new Schema({
  fecha: { type: Date, required: true },
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
  observaciones: { type: String },
  itemsNoCumplen: { type: Number, default: 0 },
  formulario: {
    type: Schema.Types.ObjectId,
    ref: 'Form',
    required: true
  }
}, { timestamps: true });

module.exports = model('Report', reportSchema);
