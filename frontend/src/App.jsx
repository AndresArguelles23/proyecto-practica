// frontend/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

import Dashboard from './pages/Dashboard';
import Reportes  from './pages/Reportes';
import Vehiculos from './pages/Vehiculos';
import Usuarios  from './pages/Usuarios';
import Principal from './pages/Principal';
import Formulario from './pages/Formulario';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"           element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard"  element={<Dashboard />} />
        <Route path="/reportes"   element={<Reportes />} />
        <Route path="/vehiculos"  element={<Vehiculos />} />
        <Route path="/usuarios"   element={<Usuarios />} />
        <Route path="/principal"  element={<Principal />} />
        <Route path="/formulario" element={<Formulario />} />
      </Routes>
    </Layout>
  );
}
