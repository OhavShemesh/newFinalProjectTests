import { Box, Button } from '@mui/material'
import React from 'react'

export default function ProductsFilter({ setCategory }) {
    return (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center", py: 2 }}>
            <Button onClick={() => { setCategory("") }} variant='contained' sx={{ backgroundColor: "rgba(0,0,0,0.7)" }}>All</Button>
            <Button onClick={() => { setCategory("Electronics") }} variant='contained' sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}>Electronics</Button>
            <Button onClick={() => { setCategory("Tools") }} variant='contained' sx={{ backgroundColor: "rgba(0,0,0,0.7)" }}>Tools</Button>
            <Button onClick={() => { setCategory("Furniture") }} variant='contained' sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}>Furniture</Button>
            <Button onClick={() => { setCategory("Garden") }} variant='contained' sx={{ backgroundColor: "rgba(0,0,0,0.7)" }}>Garden</Button>
        </Box>
    )
}
