import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import TocIcon from '@mui/icons-material/Toc';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function SetDisplay({ setDisplay, display }) {
    return (
        <Box sx={{ width: "80%", margin: "auto", display: 'flex', justifyContent: "flex-end" }}>
            <IconButton onClick={() => setDisplay("table")}>
                <TocIcon sx={{ opacity: display === "table" ? "1" : "0.5", fontSize: "28px" }} />
            </IconButton>
            <IconButton onClick={() => setDisplay("cards")}>
                <DashboardIcon sx={{ opacity: display === "cards" ? "1" : "0.5" }} />
            </IconButton>
        </Box>
    )
}
