const express   = require('express');
const cors      = require('cors');
const sequelize = require('./src/db');
const User      = require('./src/models/User');
const Vehicle   = require('./src/models/Vehicle');
const Form      = require('./src/models/Form');
const FormItem  = require('./src/models/FormItem');

const app = express();
app.use(cors());
app.use(express.json());

async function initDb() {
  try {
    await sequelize.sync({ force: true });
    const user = await User.create({
      nombre: 'Andrés Arguelles',
      licenciaVence: '2026-05-10'
    });
    const vehicle = await Vehicle.create({
      placa: 'ABC-123',
      modelo: 'Camión X',
      soatVence: '2025-12-01'
    });
    console.log('✅ DB inicializada con datos de ejemplo');
    return { user, vehicle };
  } catch (err) {
    console.error('❌ Error al inicializar DB:', err);
    process.exit(1);
  }
}

let demo;
initDb().then(obj => { demo = obj; });

// GET /forms/new
app.get('/forms/new', (_req, res) => {
  if (!demo) return res.status(503).json({ error: 'DB no lista aún' });
  const { user, vehicle } = demo;
  res.json({
    conductor: {
      id: user.id,
      nombre: user.nombre,
      licenciaVence: user.licenciaVence
    },
    vehiculo: {
      id: vehicle.id,
      placa: vehicle.placa,
      modelo: vehicle.modelo,
      soatVence: vehicle.soatVence
    },
    items: [
      { id: 1, descripcion: 'Frenos', estado: null },
      { id: 2, descripcion: 'Luces', estado: null },
      { id: 3, descripcion: 'Aceite', estado: null }
    ]
  });
});

// POST /forms
app.post('/forms', async (req, res) => {
  const { conductor, vehiculo, items } = req.body;
  try {
    const form = await Form.create({
      estado: 'pendiente',
      conductorId: conductor.id,
      vehiculoId: vehiculo.id
    });
    for (const item of items) {
      await FormItem.create({
        descripcion: item.descripcion,
        estado: item.estado,
        FormId: form.id
      });
    }
    res.status(201).json({ mensaje: 'Guardado en DB', codigo: form.id });
  } catch (err) {
    console.error('Error al guardar formulario:', err);
    res.status(500).json({ error: 'No se pudo guardar el formulario' });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 API corriendo en http://localhost:${PORT}`));
