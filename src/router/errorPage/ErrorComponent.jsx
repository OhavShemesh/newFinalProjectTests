import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';

export default function ErrorComponent({ handleRetry }) {

    return (
        <Box sx={{ minHeight: "100vh", paddingTop: 15 }}>
            <Container>
                <Typography variant='h1' textAlign={"center"} sx={{ color: "red", fontWeight: "bold" }}>404</Typography>
                <Typography variant='h2' textAlign={"center"} sx={{ color: "black" }}>Page Not Found</Typography>
                <Typography sx={{ color: "black", paddingTop: 3 }} textAlign={"center"} variant='h6'>
                    Oops! The page you’re looking for doesn’t seem to exist.<br /> It might have been moved, deleted, or the URL could be incorrect.
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", paddingTop: 4 }}>
                    <Button onClick={() => handleRetry()} variant='contained' sx={{ backgroundColor: 'black', fontSize: "18px" }}>Go Back</Button>
                </Box>

            </Container>
        </Box>
    );
}

