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
            <Typography sx={{ textAlign: "center", color: "black", marginBottom: 5 }} variant="h2">Contact Us</Typography>
            <Box sx={{ width: "100%", display: "flex", gap: 2, paddingTop: 5 }}>
                <Box sx={{ width: "50%", display: "flex", flexDirection: "column", gap: 3 }}>
                    <Box sx={{ display: "flex", gap: 3, alignItems: "center", paddingTop: 5 }}>
                        <IconButton
                            onClick={() => window.open("https://maps.app.goo.gl/MZtAQ6f2EWrxyx2a9", '_blank')}
                            disableRipple
                            sx={{
                                backgroundColor: "black",
                                padding: "10px",
                            }}
                        >
                            <LocationOnIcon sx={{ color: "white", fontSize: "32px" }} />
                        </IconButton>
                        <Typography sx={{ color: "black" }}>Israel, Petah Tiqua, Vinkler Alter 4, <br />4972102</Typography>
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
                            <PhoneIcon sx={{ color: "white", fontSize: "32px" }} />
                        </IconButton>
                        <Typography sx={{ color: "black" }}>054-9465764</Typography>
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
                            <EmailIcon sx={{ color: "white", fontSize: "32px" }} />
                        </IconButton>
                        <Typography sx={{ color: "black" }}>ohav99053@gmail.com</Typography>
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
                            <WhatsAppIcon sx={{ color: "white", fontSize: "32px" }} />
                        </IconButton>
                        <Typography sx={{ color: "black" }}>+972-54-9465764</Typography>
                    </Box>
                </Box>
                <Box sx={{ width: "50%", border: "1px solid", borderColor: "black", padding: 5, borderRadius: "20px" }}>
                    <Typography variant='h5' sx={{ color: "black", textAlign: "center", paddingBottom: 3, fontWeight: "bold" }}>Send Us Message</Typography>
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
