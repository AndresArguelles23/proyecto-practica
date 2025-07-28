// frontend/src/components/FormPage.jsx
import React, { useState } from 'react';
import {
  Paper, Typography, Box, TextField, Table, TableHead,
  TableRow, TableCell, TableBody, Checkbox, Button, Snackbar, Alert
} from '@mui/material';
import axios from '../api/axiosInstance';

export default function FormPage() {
  const [formData, setFormData] = useState({
    conductor: {
      nombre: 'Andrés Arguelles',
      cedula: '1234567890',
    },
    vehiculo: {
      placa: 'ABC-123',
      modelo: 'Camión X',
    },
    items: [
      { id: 1, descripcion: 'Frenos', estado: null },
      { id: 2, descripcion: 'Luces', estado: null },
      { id: 3, descripcion: 'Aceite', estado: null },
    ],
  });

  const [snackbar, setSnackbar] = useState({ open: false, success: true });

  const handleCheckboxChange = (index, estado) => {
    const updatedItems = [...formData.items];
    updatedItems[index].estado = estado;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/forms', formData);
      setSnackbar({ open: true, success: true });
    } catch (error) {
      console.error('Error al guardar formulario:', error);
      setSnackbar({ open: true, success: false });
    }
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, p: 3, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Formulario Preoperacional
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Nombre del Conductor"
          value={formData.conductor.nombre}
          onChange={(e) =>
            setFormData({ ...formData, conductor: { ...formData.conductor, nombre: e.target.value } })
          }
          fullWidth
        />
        <TextField
          label="Cédula"
          value={formData.conductor.cedula}
          onChange={(e) =>
            setFormData({ ...formData, conductor: { ...formData.conductor, cedula: e.target.value } })
          }
          fullWidth
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Placa del Vehículo"
          value={formData.vehiculo.placa}
          onChange={(e) =>
            setFormData({ ...formData, vehiculo: { ...formData.vehiculo, placa: e.target.value } })
          }
          fullWidth
        />
        <TextField
          label="Modelo"
          value={formData.vehiculo.modelo}
          onChange={(e) =>
            setFormData({ ...formData, vehiculo: { ...formData.vehiculo, modelo: e.target.value } })
          }
          fullWidth
        />
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Descripción</TableCell>
            <TableCell align="center">Cumple</TableCell>
            <TableCell align="center">No cumple</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formData.items.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{item.descripcion}</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={item.estado === true}
                  onChange={() => handleCheckboxChange(index, true)}
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={item.estado === false}
                  onChange={() => handleCheckboxChange(index, false)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {snackbar.success ? 'Formulario guardado con éxito' : 'Error al guardar el formulario'}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
