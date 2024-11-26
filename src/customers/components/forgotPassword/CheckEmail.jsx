import { Box, Button, Input, Typography } from '@mui/material';
import React from 'react';

export default function CheckEmail({ handleGetEmail, handleSendConfirmationMail, validationError }) {
    return (
        <Box sx={{ display: 'flex', alignItems: "center", py: 1, flexDirection: "column" }}>
            <Box
                sx={{
                    border: '1px solid',
                    borderColor: "black",
                    width: { xs: "80%", sm: "60%", md: "40%" },
                    borderRadius: "20px",
                    mt: 3,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    py: 3,
                }}
            >
                <Typography variant='h6' sx={{ color: "black" }}>What is your email?</Typography>
                <Input
                    type='email'
                    onChange={handleGetEmail}
                    disableUnderline
                    sx={{
                        border: "1px solid",
                        borderRadius: "20px",
                        height: "40px",
                        padding: "0 10px",
                        display: "flex",
                        alignItems: "center",
                        boxSizing: "border-box",
                        my: 2,
                    }}
                />
                {validationError && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {validationError.message}
                    </Typography>
                )}
                <Button
                    disabled={Boolean(validationError)}
                    onClick={handleSendConfirmationMail}
                    variant='contained'
                    sx={{ backgroundColor: 'black' }}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
}
