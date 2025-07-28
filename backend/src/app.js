// backend/src/app.js
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const formRoutes = require('./routes/form.routes');
const historyRoutes = require('./routes/history.routes');
const reportRoutes = require('./routes/report.routes');

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());

const vehicleRoutes = require('./routes/vehicle.routes');
app.use('/api/vehicles', vehicleRoutes);

// Rutas principales
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/reports', reportRoutes);

// Ruta de prueba
app.get('/api', (_req, res) => {
  res.json({ mensaje: 'API base funcionando' });
});

module.exports = app;
