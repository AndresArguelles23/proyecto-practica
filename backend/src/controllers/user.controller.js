// backend/src/controllers/user.controller.js
const User = require('../models/User');

// Obtener todos los usuarios (solo administrador)
exports.getAllUsers = async (_req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('Error al buscar usuario:', error.message);
    res.status(400).json({ error: 'ID inválido' });
  }
};

// Crear un nuevo usuario (solo administrador)
exports.createUser = async (req, res) => {
  try {
    const nuevoUsuario = new User(req.body);
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al crear usuario:', error.message);
    res.status(400).json({ error: 'Datos inválidos' });
  }
};

// Actualizar un usuario por ID (solo administrador)
exports.updateUser = async (req, res) => {
  try {
    const usuarioActualizado = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!usuarioActualizado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuarioActualizado);
  } catch (error) {
    console.error('Error al actualizar usuario:', error.message);
    res.status(400).json({ error: 'Datos inválidos o ID incorrecto' });
  }
};

// Eliminar un usuario por ID (solo administrador)
exports.deleteUser = async (req, res) => {
  try {
    const usuarioEliminado = await User.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error.message);
    res.status(400).json({ error: 'ID inválido' });
  }
};
