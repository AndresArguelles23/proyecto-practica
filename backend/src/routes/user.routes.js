// backend/src/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protegerRuta, requiereRol } = require('../middlewares/auth');

// Obtener todos los usuarios (solo administrador)
router.get('/', protegerRuta, requiereRol('administrador'), userController.getAllUsers);

// Obtener un usuario por ID (solo autenticado)
router.get('/:id', protegerRuta, userController.getUserById);

// Crear un nuevo usuario (solo administrador)
router.post('/', protegerRuta, requiereRol('administrador'), userController.createUser);

// Actualizar un usuario por ID (solo administrador)
router.put('/:id', protegerRuta, requiereRol('administrador'), userController.updateUser);

// Eliminar un usuario por ID (solo administrador)
router.delete('/:id', protegerRuta, requiereRol('administrador'), userController.deleteUser);

// Ruta de prueba protegida
router.get('/privado/panel', protegerRuta, requiereRol('administrador'), (req, res) => {
  res.json({ mensaje: `Hola ${req.usuario.nombre}, bienvenido al panel de administración.` });
});

module.exports = router;
