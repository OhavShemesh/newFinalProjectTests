import { Box, Button, Input, Typography } from '@mui/material'
import React from 'react'

export default function ChangePassword({ handleGetNewPassword, onChangePassword, validationError }) {
  return (
    <Box sx={{ paddingTop: 10 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid", borderColor: "black", width: { xs: "70%", sm: "60%", md: "50%" }, margin: "auto", borderRadius: "20px", paddingY: 5, gap: 2 }}>
        <Typography sx={{ color: 'black', fontWeight: "bold", fontSize: { xs: "18px", sm: "22px", md: "24px" } }} variant='h5'>Set New Password</Typography>
        <Input
          type='password'
          onChange={handleGetNewPassword}
          sx={{
            width: "50%",
            height: { xs: "30px", sm: '40px', md: '50px' },
            border: "1px solid",
            borderRadius: "20px",
            textAlign: "center",
            padding: 1,
          }}
          disableUnderline
        />
        {validationError && (
          <Typography color="error" variant="body2" sx={{ mt: 1, width: "70%", textAlign: "center", margin: "auto", fontSize: { xs: "10px", sm: "12px", md: '14px' } }}>
            {validationError.message}
          </Typography>
        )}
        <Button disabled={Boolean(validationError)} onClick={() => onChangePassword()} variant='contained' sx={{ backgroundColor: "black" }}>Submit</Button>
      </Box>
    </Box>
  )
}
