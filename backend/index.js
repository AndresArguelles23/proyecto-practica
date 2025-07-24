require('dotenv').config();
const app = require('./src/app');
const conectarDB = require('./src/config/db');

const PORT = process.env.PORT || 4000;

conectarDB();

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
