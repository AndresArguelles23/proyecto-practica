// frontend/src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api', // Ajusta según sea producción o local
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
