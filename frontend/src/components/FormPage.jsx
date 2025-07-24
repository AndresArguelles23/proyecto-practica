import React from 'react';
import {
  Paper, Typography, Box, TextField, Table, TableHead,
  TableRow, TableCell, TableBody, Checkbox, Button
} from '@mui/material';

export default function FormPage() {
  // datos mock para demo
  const conductor = { nombre: 'Andrés Arguelles' };
  const vehiculo = { placa: 'ABC-123', modelo: 'Camión X' };
  const items = [
    { id: 1, descripcion: 'Frenos', estado: true },
    { id: 2, descripcion: 'Luces', estado: false },
    { id: 3, descripcion: 'Aceite', estado: true },
  ];

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, p: 3, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Formulario Preoperacional
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Datos Conductor"
          multiline
          rows={4}
          fullWidth
          value={`${conductor.nombre}`}
        />
        <TextField
          label="Datos Vehículo"
          multiline
          rows={4}
          fullWidth
          value={`${vehiculo.placa} - ${vehiculo.modelo}`}
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
          {items.map(it => (
            <TableRow key={it.id}>
              <TableCell>{it.descripcion}</TableCell>
              <TableCell align="center">
                <Checkbox checked={it.estado === true} />
              </TableCell>
              <TableCell align="center">
                <Checkbox checked={it.estado === false} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
        <Button variant="contained" color="primary">Guardar</Button>
        <Button variant="outlined" color="secondary">Enviar</Button>
      </Box>
    </Paper>
  );
}
