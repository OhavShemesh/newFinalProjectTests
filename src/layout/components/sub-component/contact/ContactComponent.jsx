import { Box, Button, IconButton, Typography } from '@mui/material';
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FormInputs from "../../../../formHelpers/FormInputs"
import FormTextarea from "../../../../formHelpers/FormTextarea"

export default function ContactComponent({ handleEmailClick, handleChange, error, onSubmit, isFormValid, customer, setSnack }) {

    return (
        <Box sx={{ minHeight: "100vh", paddingX: 5 }}>
            <Typography sx={{ textAlign: "center", color: "black", marginBottom: { xs: 0, sm: 0, md: 5 }, fontSize: { xs: "2rem", sm: "2.5rem", md: "4rem" }, textDecoration: "underline" }} variant="h2">Contact Us</Typography>
            <Box sx={{ width: "100%", display: "flex", gap: 2, paddingTop: 5, flexDirection: { xs: "column-reverse", sm: "column-reverse", md: "row" }, alignItems: "center" }}>
                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
                    <Box sx={{ display: "flex", gap: 3, alignItems: "center", paddingTop: 5 }}>
                        <IconButton
                            onClick={() => window.open("https://maps.app.goo.gl/MZtAQ6f2EWrxyx2a9", '_blank')}
                            disableRipple
                            sx={{
                                backgroundColor: "black",
                                padding: "10px",
                            }}
                        >
                            <LocationOnIcon sx={{ color: "white", fontSize: { xs: "18px", sm: "24px", md: "34px" } }} />
                        </IconButton>
                        <Typography sx={{ color: "black", fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem" } }}>Israel, Petah Tiqua, Vinkler Alter 4, <br />4972102</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                        <IconButton
                            onClick={() => window.location.href = "tel:054-9465764"}
                            disableRipple
                            sx={{
                                backgroundColor: "black",
                                padding: "10px",
                            }}
                        >
                            <PhoneIcon sx={{ color: "white", fontSize: { xs: "18px", sm: "24px", md: "34px" } }} />
                        </IconButton>
                        <Typography sx={{ color: "black", fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem" } }}>054-9465764</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                        <IconButton
                            onClick={handleEmailClick}
                            disableRipple
                            sx={{
                                backgroundColor: "black",
                                padding: "10px",
                            }}
                        >
                            <EmailIcon sx={{ color: "white", fontSize: { xs: "18px", sm: "24px", md: "34px" } }} />
                        </IconButton>
                        <Typography sx={{ color: "black", fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem" } }}>ohav99053@gmail.com</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                        <IconButton
                            onClick={() => window.open("https://wa.me/972549465764", '_blank')}
                            disableRipple
                            sx={{
                                backgroundColor: "black",
                                padding: "10px",
                            }}
                        >
                            <WhatsAppIcon sx={{ color: "white", fontSize: { xs: "18px", sm: "24px", md: "34px" } }} />
                        </IconButton>
                        <Typography sx={{ color: "black", fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem" } }}>+972-54-9465764</Typography>
                    </Box>
                </Box>
                <Box sx={{ width: "100%", border: "1px solid", borderColor: "black", padding: 5, borderRadius: "20px" }}>
                    <Typography variant='h5' sx={{ color: "black", textAlign: "center", paddingBottom: 3, fontWeight: "bold", fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" } }}>Send Us Message</Typography>
                    <FormTextarea label={"Message"} inputNames={["Message Here"]} handleChange={handleChange} error={error} />
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                        <Button
                            onClick={() => customer ? onSubmit() : setSnack("error", "please Loggin")}
                            variant='contained'
                            disabled={!Boolean(isFormValid)}
                            sx={{
                                border: "1px solid black",
                                paddingX: 5,
                                backgroundColor: customer ? "black" : "grey",
                                fontWeight: "bold"
                            }}>Send</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
