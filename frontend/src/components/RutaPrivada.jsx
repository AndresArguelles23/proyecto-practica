// src/components/RutaPrivada.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RutaPrivada = ({ rolRequerido }) => {
  const { usuario } = useAuth(); // Accede al usuario autenticado

  // Si no hay usuario autenticado, redirige al login
  if (!usuario) return <Navigate to="/login" />;

  // Si se requiere un rol específico y el usuario no lo tiene, redirige al dashboard
  if (rolRequerido && usuario.rol !== rolRequerido) {
    return <Navigate to="/" />;
  }

  // Si pasa las validaciones, permite mostrar la ruta interna
  return <Outlet />;
};

export default RutaPrivada;
