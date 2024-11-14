import React from 'react';
import { Box, Toolbar, Button } from '@mui/material';
import './styles/Footer.css';
import ROUTES from '../../router/routesModel';

export default function Footer({ navigate, customer, setSnack }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: 1300,
        backgroundColor: '#333',
      }}
    >
      <Toolbar className="toolbar" sx={{ justifyContent: 'center' }}>
        <Button onClick={() => navigate(ROUTES.ABOUT)} sx={{ color: '#FFFFFF', fontSize: { xs: "0.6rem", sm: "0.8rem" } }}>
          About
        </Button>

        <Box
          sx={{
            width: '1px',
            height: '24px',
            backgroundColor: '#FFFFFF',
            mx: 1
          }}
        />

        <Button onClick={() => navigate(ROUTES.CONTACT)} sx={{ color: '#FFFFFF', fontSize: { xs: "0.6rem", sm: "0.8rem" } }}>
          Contact
        </Button>

        <Box
          sx={{
            width: '1px',
            height: '24px',
            backgroundColor: '#FFFFFF',
            mx: 1
          }}
        />

        <Button onClick={() => customer ? navigate(ROUTES.BUSINESS_BOARD) : setSnack("error", "Please Login")} sx={{ color: '#FFFFFF', fontSize: { xs: "0.6rem", sm: "0.8rem" } }}>
          Business Board
        </Button>
      </Toolbar>
    </Box>
  );
}
