// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  // Cargar sesión desde localStorage si existe
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    const tokenGuardado = localStorage.getItem('token');

    if (usuarioGuardado && tokenGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
      setToken(tokenGuardado);
    }
  }, []);

  // Función para iniciar sesión
  const login = async (credenciales) => {
    try {
      const data = await loginUsuario(credenciales);
      setUsuario(data.usuario);
      setToken(data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Función para verificar si el usuario tiene un rol específico
  const tieneRol = (rol) => usuario?.rol === rol;

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, cerrarSesion: logout, tieneRol }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
