import { Box, Button, Input, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function MakeCustomerBusiness({ customerDetails, toTitleCase, handleOnSubmitSecretCode, wrongCode }) {
    const [enteredCode, setEnteredCode] = useState("")

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "white" }}>

            <Box sx={{ display: "flex", alignItems: "center", pt: 5, flexDirection: "column", gap: 2 }}>
                <Typography sx={{ fontSize: { xs: "24px", sm: "30px", md: "46px" }, textAlign: 'center' }} color='black' variant='h2'>Hello {toTitleCase(customerDetails.name?.first)}</Typography>
                <Typography sx={{ fontSize: { xs: "16px", sm: "20px", md: "26px" }, textAlign: 'center' }} color='black' variant='h6'>
                    It appears you do not currently have Business or Admin status.
                </Typography>
                <Typography sx={{ fontSize: { xs: "14px", sm: "218px", md: "24px" }, textAlign: 'center' }} color='black' variant='h6'>
                    Please enter admin or business code to proceed with upgrading your account:
                </Typography>
                <TextField sx={{ border: "1px solid", borderColor: "black" }} onChange={(e) => setEnteredCode(e.target.value)} variant="outlined" />
                {wrongCode && <Typography variant='h6' sx={{ fontSize: "small", color: "red" }}>CODE IS NOT CORRECT</Typography>}
                <Button onClick={() => handleOnSubmitSecretCode(enteredCode)} variant='contained'>Submit</Button>
            </Box>
        </Box>

    );
}
