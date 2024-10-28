import { Box, Button, Input, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function MakeCustomerBusiness({ customerDetails, toTitleCase, handleOnSubmitSecretCode, wrongCode }) {
    const [enteredCode, setEnteredCode] = useState("")

    return (
        <Box sx={{ display: "flex", alignItems: "center", pt: 5, flexDirection: "column", gap: 2 }}>
            <Typography variant='h2'>Hello {toTitleCase(customerDetails.name?.first)}</Typography>
            <Typography variant='h6'>
                It appears you do not currently have Business or Admin status.
            </Typography>
            <Typography variant='h6'>
                Please enter admin or business code to proceed with upgrading your account:
            </Typography>
            <TextField onChange={(e) => setEnteredCode(e.target.value)} variant="outlined" />
            {wrongCode && <Typography variant='h6' sx={{ fontSize: "small", color: "red" }}>CODE IS NOT CORRECT</Typography>}
            <Button onClick={() => handleOnSubmitSecretCode(enteredCode)} variant='contained'>Submit</Button>
        </Box>
    );
}
