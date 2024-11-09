import { Box } from '@mui/material'
import React from 'react'

export default function Main({ children }) {
    return (
        <Box sx={{ marginTop: "70px", marginBottom: "70px", backgroundColor: "white" }}>{children}</Box>
    )
}
