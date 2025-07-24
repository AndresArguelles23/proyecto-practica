// src/components/Layout.jsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material';

import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { usuario, cerrarSesion } = useAuth(); // Hook del contexto de autenticación
  const navigate = useNavigate(); // Hook para redireccionar entre páginas

  const handleLogout = () => {
    cerrarSesion(); // Elimina el token y el usuario
    navigate('/login'); // Redirige al login
  };

  return (
    <>
      {/* Barra de navegación superior */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Formularios Preoperacionales
          </Typography>

          {/* Botón para cerrar sesión */}
          {usuario && (
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Contenedor principal */}
      <Container sx={{ mt: 4 }}>
        {/* Aquí se renderiza la ruta activa */}
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
