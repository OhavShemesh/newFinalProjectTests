import { Box, Button, CardMedia, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import FormInputsForProfile from '../helper/FormInputsForProfile';

export default function ProfileComponent({ customerDetails, handleChange, error, onSubmit, isFormValid }) {

    return (
        <Container sx={{ paddingTop: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ color: "black", pb: { xs: 3, sm: 3, md: 0 } }} variant='h5'>Your Details:</Typography>
            <Box sx={{ pl: { xs: 0, sm: 0, md: 10 } }}>
                <FormInputsForProfile
                    label="Name"
                    inputNames={["First Name", "Middle Name", "Last Name"]}
                    details={{
                        "First Name": customerDetails?.name?.first || "",
                        "Middle Name": customerDetails?.name?.middle || "",
                        "Last Name": customerDetails?.name?.last || ""
                    }}
                    handleChange={handleChange}
                    error={error}
                />
                <FormInputsForProfile
                    label="Phone"
                    inputNames={["Phone Number"]}
                    details={{
                        "Phone Number": customerDetails?.phone || ""
                    }}
                    handleChange={handleChange}
                    error={error}
                />
                <FormInputsForProfile
                    label="Account Details"
                    inputNames={["Email", "Password"]}
                    details={{
                        "Email": customerDetails?.email || "",
                        "Password": "***************" || ""
                    }}
                    handleChange={handleChange}
                    error={error}
                />
                <FormInputsForProfile
                    label="Profile Picture"
                    inputNames={["Image Url", "Image Alt"]}
                    details={{
                        "Image Url": customerDetails?.image?.url || "",
                        "Image Alt": customerDetails?.image?.alt || ""
                    }}
                    handleChange={handleChange}
                    error={error}
                />
                <FormInputsForProfile
                    label="Address"
                    inputNames={["City", "Street", "House Number", "Zip"]}
                    details={{
                        "City": customerDetails?.address?.city || "",
                        "Street": customerDetails?.address?.street || "",
                        "House Number": customerDetails?.address?.houseNumber || "",
                        "Zip": customerDetails?.address?.zip || ""
                    }}
                    handleChange={handleChange}
                    error={error}
                />
            </Box>
            <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "center", md: "flex-end" }, my: 3, width: { xs: "100%", sm: "100%", md: "80%" } }}>
                <Button
                    onClick={onSubmit}
                    variant="contained"
                    sx={{
                        backgroundColor: "black",
                        borderRadius: "10px",
                        width: "50%",
                        fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                        border: "3px solid",
                        borderColor: "black"
                    }}
                >
                    Save Changes
                </Button>
            </Box>
        </Container>
    );
}
