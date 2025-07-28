// src/services/formularioService.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/forms';

export const guardarFormulario = async (formulario) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${API_URL}/`, formulario, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
