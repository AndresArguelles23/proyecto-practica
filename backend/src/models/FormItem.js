// backend/src/models/FormItem.js
const { Schema, model } = require('mongoose');

const formItemSchema = new Schema({
  formulario: {
    type: Schema.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['cumple', 'no cumple', 'no aplica'],
    required: true
  }
}, { timestamps: true });

module.exports = model('FormItem', formItemSchema);
