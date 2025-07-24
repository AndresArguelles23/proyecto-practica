const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User    = require('./User');
const Vehicle = require('./Vehicle');

const Form = sequelize.define('Form', {
  estado: { type: DataTypes.STRING, allowNull: false }
});

// Relaciones
Form.belongsTo(User,    { as: 'conductor' });
Form.belongsTo(Vehicle, { as: 'vehiculo' });

module.exports = Form;
