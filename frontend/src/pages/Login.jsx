import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../services/authService';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  Box
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [credenciales, setCredenciales] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const { setUsuario } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      const { token, usuario } = await loginUsuario(credenciales);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      setUsuario(usuario);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error al iniciar sesión:', err.message);
      setError('Credenciales incorrectas');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Iniciar Sesión
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid>
            <TextField
              label="Correo electrónico"
              name="email"
              type="email"
              fullWidth
              required
              value={credenciales.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </Grid>

          <Grid>
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              fullWidth
              required
              value={credenciales.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </Grid>

          <Grid>
            <Box display="flex" justifyContent="flex-end">
              <Button type="submit" variant="contained" color="primary" disabled={cargando}>
                {cargando ? <CircularProgress size={24} /> : 'Ingresar'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Login;
