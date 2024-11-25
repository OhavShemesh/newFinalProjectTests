import { Box, Button, Input, Typography } from '@mui/material'
import React from 'react'

export default function CheckValidation({ onValidateCode, handleGetValidationCodeFromCustomer, timer, handleSendConfirmationMail }) {
    return (
        <Box sx={{ paddingTop: 10 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid", borderColor: "black", width: "50%", margin: "auto", borderRadius: "20px", paddingY: 5, gap: 2 }}>
                <Typography sx={{ color: 'black', fontWeight: "bold" }} variant='h5'>Submit Code From Email</Typography>
                <Input
                    onChange={handleGetValidationCodeFromCustomer}
                    sx={{
                        width: "30%",
                        height: "50px",
                        border: "1px solid",
                        borderRadius: "20px",
                        textAlign: "center",
                        lineHeight: "50px",
                        padding: 1,
                    }}
                    disableUnderline
                />
                <Button onClick={() => handleSendConfirmationMail()} disabled={Boolean(timer)} sx={{ color: 'purple' }}> Didn't get the message? Send Again {timer === 0 ? "" : `(${timer})`}</Button>
                <Button onClick={() => onValidateCode()} variant='contained' sx={{ backgroundColor: "black" }}>Submit</Button>
            </Box>
        </Box>
    )
}
