import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import FormInputs from '../../formHelpers/FormInputs';

export default function LoginComponent({ handleChange, error, isFormValid, onSubmit }) {


    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "white", paddingTop: "3%" }}>
            <Box sx={{ width: { xs: "90%", sm: "80%", md: "70%" }, margin: "auto", border: '1px solid', borderColor: "black", borderRadius: "20px" }}>
                <Typography variant="h4" sx={{ py: "1%", mb: "2%", textAlign: "center", backgroundColor: '#000000', height: "2%", border: "1px solid ", borderColor: "#000000", color: "#FFFFFF", borderRadius: "20px 20px 0 0 ", fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" } }}>
                    Customer Login Form
                </Typography>
                <FormInputs width={"80%"} error={error} handleChange={handleChange} label={"Email"} inputNames={["Email"]} />
                <FormInputs width={"80%"} error={error} handleChange={handleChange} label={"Password"} inputNames={["Password"]} />

                <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "center", md: "flex-end" }, my: { xs: 1, sm: 2, md: 3 }, width: { xs: "100%", sm: "100%", md: '80%' } }}>
                    <Button
                        onClick={onSubmit}
                        disabled={!Boolean(isFormValid)}
                        variant='contained'
                        sx={{
                            backgroundColor: "black",
                            borderRadius: "10px",
                            width: "50%",
                            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                            border: "3px solid",
                            borderColor: "black"
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
