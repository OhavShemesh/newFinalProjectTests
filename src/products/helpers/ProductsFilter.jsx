import { Box, Button } from '@mui/material'
import React from 'react'

export default function ProductsFilter({ setCategory }) {
    return (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center", py: 2 }}>
            <Button onClick={() => { setCategory("") }} variant='contained' sx={{ backgroundColor: "black", border: "1px solid", borderColor: "white", color: "white" }}>All</Button>
            <Button onClick={() => { setCategory("Electronics") }} variant='contained' sx={{ backgroundColor: "lightgrey", color: "white" }}>Electronics</Button>
            <Button onClick={() => { setCategory("Tools") }} variant='contained' sx={{ backgroundColor: "black", color: "white" }}>Tools</Button>
            <Button onClick={() => { setCategory("Furniture") }} variant='contained' sx={{ backgroundColor: "lightgrey", color: "white" }}>Furniture</Button>
            <Button onClick={() => { setCategory("Garden") }} variant='contained' sx={{ backgroundColor: "black", color: "white" }}>Garden</Button>
        </Box>
    )
}
