import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import "../styles/registerStyles.css";
import FormInputs from '../../formHelpers/FormInputs';

export default function RegisterComponent({ handleChange, error, isFormValid, onSubmit }) {


    return ( 
        <>
            <form>
                <Typography variant="h4" sx={{ py: "1%", mb: "2%" }}>
                    Customer Registration Form
                </Typography>
                <FormInputs error={error} handleChange={handleChange} label={"Full Name"} inputNames={["First Name", "Middle Name", "Last Name"]} />
                <FormInputs error={error} handleChange={handleChange} label={"Phone"} inputNames={["Phone Number"]} />
                <FormInputs error={error} handleChange={handleChange} label={"Account Details"} inputNames={["Email", "Password"]} />
                <FormInputs error={error} handleChange={handleChange} label={"Profile Picture"} inputNames={["Image Url", "Image Alt"]} />
                <FormInputs error={error} handleChange={handleChange} label={"Address"} inputNames={["City", "Street", "House Number", "Zip"]} />

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
