import React, { useEffect } from 'react';
import { Box, Toolbar, Button } from '@mui/material';
import './styles/Footer.css';

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
        <Button sx={{ color: 'white' }}>About</Button>
        <Button sx={{ color: 'white' }}>Contact</Button>
      </Toolbar>
    </Box>
  );
}
