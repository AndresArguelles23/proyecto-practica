// frontend/src/components/Layout.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Typography,
  Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Divider, Box
} from '@mui/material';
import MenuIcon        from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon        from '@mui/icons-material/Home';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DirectionsCarIcon   from '@mui/icons-material/DirectionsCar';
import PeopleIcon      from '@mui/icons-material/People';
import SettingsIcon    from '@mui/icons-material/Settings';
import AssignmentIcon  from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';

const drawerWidth = 240;

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(o => !o);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Inspección Preoperacional
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Typography sx={{ ml: 1 }}>Ricardo García</Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { width: drawerWidth } }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="h6">Menú</Typography>
        </Box>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard" onClick={toggleDrawer}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/reportes" onClick={toggleDrawer}>
              <ListItemIcon><InsertDriveFileIcon /></ListItemIcon>
              <ListItemText primary="Reportes" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/vehiculos" onClick={toggleDrawer}>
              <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
              <ListItemText primary="Vehículos" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/usuarios" onClick={toggleDrawer}>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/principal" onClick={toggleDrawer}>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Principal" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/formulario" onClick={toggleDrawer}>
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText primary="Formulario" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Contenido */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, mt: 8 }}
      >
        {children}
      </Box>
    </Box>
  );
}
