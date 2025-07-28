// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de páginas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Formulario from './pages/Formulario';
import Vehiculos from './pages/Vehiculos';
import Usuarios from './pages/Usuarios';

// Importación del layout general
import Layout from './components/Layout';

// Importación del contexto de autenticación
import { AuthProvider } from './context/AuthContext';
import RutaPrivada from './components/RutaPrivada';

function App() {
  return (
    // Proveedor del contexto de autenticación para toda la app
    <AuthProvider>
      <Routes>
        {/* Ruta pública para el login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas privadas que requieren autenticación */}
        <Route element={<RutaPrivada />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="formulario" element={<Formulario />} />
            <Route path="vehiculos" element={<Vehiculos />} />
            <Route path="usuarios" element={<Usuarios />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
