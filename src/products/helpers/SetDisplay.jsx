import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import TocIcon from '@mui/icons-material/Toc';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function SetDisplay({ setDisplay }) {
    return (
        <Box sx={{ width: "80%", margin: "auto", display: 'flex', justifyContent: "flex-end" }}>
            <IconButton onClick={() => setDisplay("table")}>
                <TocIcon />
            </IconButton>
            <IconButton onClick={() => setDisplay("cards")}>
                <DashboardIcon />
            </IconButton>
        </Box>
    )
}
