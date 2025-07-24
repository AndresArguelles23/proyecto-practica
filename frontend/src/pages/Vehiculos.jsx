import React, { useEffect, useState } from 'react';
import { obtenerVehiculos } from '../services/vehiculoService';
import { Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Alert } from '@mui/material';

const Vehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarVehiculos = async () => {
      try {
        const data = await obtenerVehiculos();
        setVehiculos(data);
      } catch (err) {
        console.error('Error al cargar vehículos:', err.message);
        setError('No se pudieron cargar los vehículos');
      } finally {
        setCargando(false);
      }
    };

    cargarVehiculos();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Lista de Vehículos</Typography>

        {cargando ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : vehiculos.length === 0 ? (
          <Typography>No hay vehículos registrados.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Placa</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Año</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehiculos.map((vehiculo) => (
                <TableRow key={vehiculo._id}>
                  <TableCell>{vehiculo.placa}</TableCell>
                  <TableCell>{vehiculo.marca}</TableCell>
                  <TableCell>{vehiculo.modelo}</TableCell>
                  <TableCell>{vehiculo.anio}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default Vehiculos;
