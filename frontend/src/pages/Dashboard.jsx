// src/pages/Dashboard.jsx

// Importación de React y el contexto de autenticación
import React from 'react';
import { useAuth } from '../context/AuthContext';
// Componentes de Material UI
import { Typography, Paper, Box } from '@mui/material';

const Dashboard = () => {
  // Obtiene el usuario actual del contexto de autenticación
  const { usuario } = useAuth();

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      {/* Título de bienvenida */}
      <Typography variant="h4" gutterBottom>
        Bienvenido al Dashboard
      </Typography>

      {/* Información del usuario autenticado */}
      {usuario && (
        <Box mt={2}>
          <Typography variant="h6">Nombre: {usuario.nombre}</Typography>
          <Typography variant="body1">Correo: {usuario.email}</Typography>
          <Typography variant="body1">Rol: {usuario.rol}</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default Dashboard;
