import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import "../styles/registerStyles.css";
import FormInputs from '../../formHelpers/FormInputs';

export default function LoginComponent({ handleChange, error, isFormValid, onSubmit }) {


    return (
        <>
            <form>
                <Typography variant="h4" sx={{ py: "1%", mb: "2%" }}>
                    Customer Login Form
                </Typography>
                <FormInputs width={"80%"} error={error} handleChange={handleChange} label={"Email"} inputNames={["Email"]} />
                <FormInputs width={"80%"} error={error} handleChange={handleChange} label={"Password"} inputNames={["Password"]} />

                <Box sx={{ display: "flex", justifyContent: "flex-end", my: 3, width: "80%" }}>
                    <Button
                        onClick={onSubmit}
                        disabled={!Boolean(isFormValid)}
                        variant='contained'
                        sx={{
                            backgroundColor: "black",
                            borderRadius: "10px",
                            width: "50%",
                            fontSize: "1rem",
                            border: "3px solid black"
                        }}
                    >
                        Register
                    </Button>
                </Box>
            </form>
        </>
    );
}
