// frontend/src/pages/Dashboard.jsx
import React from 'react';
import { Typography } from '@mui/material';

export default function Dashboard() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography>
        Aquí irían los indicadores principales y el gráfico de tiempo de uso.
      </Typography>
    </div>
  );
}
