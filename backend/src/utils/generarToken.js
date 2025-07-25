// backend/src/utils/generarToken.js
const jwt = require('jsonwebtoken');

const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario._id,
      nombre: usuario.nombre,
      rol: usuario.rol
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d'
    }
  );
};

module.exports = generarToken;
