// backend/src/models/Vehicle.js
const { Schema, model } = require('mongoose');

const vehicleSchema = new Schema({
  placa: {
    type: String,
    required: true,
    unique: true
  },
  marca: {
    type: String,
    required: true
  },
  modelo: {
    type: String,
    required: true
  },
  anio: {
    type: Number,
    required: true
  },
  soatVence: {
    type: Date,
    required: true
  },
  revisionTecnomecanica: {
    type: Date,
    required: false
  },
  otrosDocumentos: [{
    nombre: String,
    vence: Date
  }]
}, { timestamps: true });

module.exports = model('Vehicle', vehicleSchema);
