// backend/src/controllers/auth.controller.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario._id, rol: usuario.rol, nombre: usuario.nombre },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email });

    if (!usuario) {
      console.warn('⚠️ Usuario no encontrado:', email);
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Solo para pruebas: comparación directa sin encriptación
    if (!usuario.password || usuario.password !== password) {
      console.warn('⚠️ Contraseña incorrecta para:', email);
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('❌ Error inesperado en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
