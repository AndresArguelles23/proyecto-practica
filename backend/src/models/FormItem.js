const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Form      = require('./Form');

const FormItem = sequelize.define('FormItem', {
  descripcion:{ type: DataTypes.STRING, allowNull: false },
  estado:     { type: DataTypes.STRING }
});

// Relaciones
FormItem.belongsTo(Form);
Form.hasMany(FormItem, { as: 'items' });

module.exports = FormItem;
