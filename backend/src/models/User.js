const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  nombre:       { type: DataTypes.STRING,   allowNull: false },
  licenciaVence:{ type: DataTypes.DATEONLY, allowNull: false }
});

module.exports = User;
