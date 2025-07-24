// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth';

export const loginUsuario = async (credenciales) => {
  const res = await axios.post(`${API_URL}/login`, credenciales);
  return res.data; // { token, usuario }
};
