import React, { useEffect, useState } from 'react';
import { guardarFormulario } from '../services/formularioService';
import { obtenerVehiculos } from '../services/vehiculoService';
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  Box
} from '@mui/material';

const Formulario = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [formulario, setFormulario] = useState({
    vehiculo: '',
    observaciones: '',
    items: [
      { descripcion: 'Frenos', estado: 'cumple' },
      { descripcion: 'Luces', estado: 'cumple' },
      { descripcion: 'Llantas', estado: 'cumple' }
    ]
  });

  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    const cargarVehiculos = async () => {
      try {
        const data = await obtenerVehiculos();
        setVehiculos(data);
      } catch (error) {
        setMensaje({ tipo: 'error', texto: 'Error al cargar vehículos' });
      }
    };

    cargarVehiculos();
  }, []);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleEstadoItem = (index, estado) => {
    const nuevosItems = [...formulario.items];
    nuevosItems[index].estado = estado;
    setFormulario({ ...formulario, items: nuevosItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);

    try {
      const payload = {
        conductor: usuario.id,
        vehiculo: formulario.vehiculo,
        observaciones: formulario.observaciones,
        estado: 'completado',
        firma: 'sin_firma.png',
        codigoJustificativo: '',
        items: formulario.items
      };

      await guardarFormulario(payload);
      setMensaje({ tipo: 'success', texto: 'Formulario guardado correctamente' });

      setFormulario({
        vehiculo: '',
        observaciones: '',
        items: formulario.items.map(i => ({ ...i, estado: 'cumple' }))
      });
    } catch (error) {
      console.error(error);
      setMensaje({ tipo: 'error', texto: 'Error al guardar el formulario' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>Formulario de Inspección Preoperacional</Typography>
      {mensaje && <Alert severity={mensaje.tipo}>{mensaje.texto}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid>
            <TextField
              select
              fullWidth
              label="Selecciona un vehículo"
              name="vehiculo"
              value={formulario.vehiculo}
              onChange={handleChange}
              required
            >
              {vehiculos.map((v) => (
                <MenuItem key={v._id} value={v._id}>
                  {v.placa} - {v.marca}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {formulario.items.map((item, index) => (
            <Grid key={index}>
              <Typography>{item.descripcion}</Typography>
              <TextField
                select
                fullWidth
                value={item.estado}
                onChange={(e) => handleEstadoItem(index, e.target.value)}
              >
                <MenuItem value="cumple">Cumple</MenuItem>
                <MenuItem value="no cumple">No Cumple</MenuItem>
              </TextField>
            </Grid>
          ))}

          <Grid>
            <TextField
              fullWidth
              label="Observaciones"
              name="observaciones"
              value={formulario.observaciones}
              onChange={handleChange}
              multiline
              rows={3}
            />
          </Grid>

          <Grid>
            <Box display="flex" justifyContent="flex-end">
              <Button type="submit" variant="contained" color="primary" disabled={cargando}>
                {cargando ? <CircularProgress size={24} /> : 'Guardar Formulario'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Formulario;
