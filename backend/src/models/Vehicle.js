const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Vehicle = sequelize.define('Vehicle', {
  placa:    { type: DataTypes.STRING,   allowNull: false },
  modelo:   { type: DataTypes.STRING,   allowNull: false },
  soatVence:{ type: DataTypes.DATEONLY, allowNull: false }
});

module.exports = Vehicle;
