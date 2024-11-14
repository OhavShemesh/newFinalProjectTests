import { Box, Button } from '@mui/material';
import React from 'react';

export default function ProductsFilter({ setCategory }) {
    return (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center", flexWrap: "wrap", py: 2, px: 2 }}>
            <Button
                onClick={() => { setCategory("") }}
                variant='contained'
                sx={{
                    backgroundColor: "black",
                    border: "1px solid",
                    borderColor: "white",
                    color: "white",
                    width: { xs: '31%', sm: 'auto' },
                    fontSize: { xs: '0.8rem', sm: '1rem' }
                }}
            >
                All
            </Button>
            <Button
                onClick={() => { setCategory("Electronics") }}
                variant='contained'
                sx={{
                    backgroundColor: "lightgrey",
                    color: "white",
                    width: { xs: '31%', sm: 'auto' },
                    fontSize: { xs: '0.8rem', sm: '1rem' }
                }}
            >
                Electronics
            </Button>
            <Button
                onClick={() => { setCategory("Tools") }}
                variant='contained'
                sx={{
                    backgroundColor: "black",
                    color: "white",
                    width: { xs: '31%', sm: 'auto' },
                    fontSize: { xs: '0.8rem', sm: '1rem' }
                }}
            >
                Tools
            </Button>
            <Button
                onClick={() => { setCategory("Furniture") }}
                variant='contained'
                sx={{
                    backgroundColor: "lightgrey",
                    color: "white",
                    width: { xs: '31%', sm: 'auto' },
                    fontSize: { xs: '0.8rem', sm: '1rem' }
                }}
            >
                Furniture
            </Button>
            <Button
                onClick={() => { setCategory("Garden") }}
                variant='contained'
                sx={{
                    backgroundColor: "black",
                    color: "white",
                    width: { xs: '31%', sm: 'auto' },
                    fontSize: { xs: '0.8rem', sm: '1rem' }
                }}
            >
                Garden
            </Button>
        </Box>
    );
}
