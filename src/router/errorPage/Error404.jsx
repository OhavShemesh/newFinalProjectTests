import { Box, Button, Typography } from '@mui/material';
import React from 'react';

export default function ErrorComponent({ handleRetry }) {

    return (
        <Box sx={{ minHeight: "100vh", paddingTop: 20 }}>
            <Typography variant='h2' textAlign={"center"} sx={{ color: "black" }}>Error Page</Typography>
            <Typography sx={{ color: "black", paddingTop: 3 }} textAlign={"center"} variant='h6'>
                We're having trouble connecting right now. Please try again in a few moments.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", paddingTop: 4 }}>
                <Button onClick={() => handleRetry()} variant='contained' sx={{ backgroundColor: 'black', fontSize: "18px" }}>Try Again</Button>
            </Box>
        </Box>
    );
}

