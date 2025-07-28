// src/services/usuarioService.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/users';

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

// Obtener todos los usuarios (solo admins)
export const obtenerUsuarios = async () => {
  const res = await axios.get(API_URL, getHeaders());
  return res.data;
};

// Crear un nuevo usuario (solo admins)
export const crearUsuario = async (usuario) => {
  const res = await axios.post(API_URL, usuario, getHeaders());
  return res.data;
};

// Editar un usuario existente
export const editarUsuario = async (id, usuarioActualizado) => {
  const res = await axios.put(`${API_URL}/${id}`, usuarioActualizado, getHeaders());
  return res.data;
};

// Eliminar un usuario
export const eliminarUsuario = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, getHeaders());
  return res.data;
};
