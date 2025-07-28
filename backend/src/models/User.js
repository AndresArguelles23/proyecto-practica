// backend/src/models/User.js
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  licenciaVence: {
    type: Date,
    required: true
  },
  rol: {
    type: String,
    enum: ['conductor', 'administrador'],
    default: 'conductor'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = model('User', userSchema);
