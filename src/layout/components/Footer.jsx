import React, { useEffect } from 'react';
import { Box, Toolbar, Button } from '@mui/material';
import './styles/Footer.css';
import ROUTES from '../../router/routesModel';

export default function Footer({ navigate }) {


  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: 1300,
      }}
    >
      <Toolbar className="toolbar" sx={{ justifyContent: 'center' }}>
        <Button onClick={() => navigate(ROUTES.ABOUT)} sx={{ color: '#FFFFFF' }}>About</Button>
        <Button onClick={() => navigate(ROUTES.CONTACT)} sx={{ color: '#FFFFFF' }}>Contact</Button>
        <Button onClick={() => navigate(ROUTES.BUSINESS_BOARD)} sx={{ color: '#FFFFFF' }}>Business Board</Button>
      </Toolbar>
    </Box>
  );
}
