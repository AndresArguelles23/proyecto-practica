// src/services/vehiculoService.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/vehicles';

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

// Obtener todos los vehículos
export const obtenerVehiculos = async () => {
  const res = await axios.get(API_URL, getHeaders());
  return res.data;
};

// Crear un nuevo vehículo
export const crearVehiculo = async (vehiculo) => {
  const res = await axios.post(API_URL, vehiculo, getHeaders());
  return res.data;
};

// Editar un vehículo existente
export const editarVehiculo = async (id, vehiculoActualizado) => {
  const res = await axios.put(`${API_URL}/${id}`, vehiculoActualizado, getHeaders());
  return res.data;
};

// Eliminar un vehículo
export const eliminarVehiculo = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, getHeaders());
  return res.data;
};
