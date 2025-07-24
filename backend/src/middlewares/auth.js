// backend/src/middlewares/auth.js
const jwt = require('jsonwebtoken');

exports.protegerRuta = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No se proporcionó token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

exports.requiereRol = (rol) => {
  return (req, res, next) => {
    if (!req.usuario || req.usuario.rol !== rol) {
      return res.status(403).json({ error: 'Acceso denegado, requiere rol de ' + rol });
    }
    next();
  };
};
