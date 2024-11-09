import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FormInputs from "../../../../formHelpers/FormInputs"
import ContactComponent from './ContactComponent';
import useForm from '../../../../formHelpers/useForm';
import initialContactForm from './initialContactForm';
import contactSchema from '../../../../formHelpers/schemas/sendUsMessageSchema';
import { useCurrentCustomer } from '../../../../customers/provider/UserProvider';
import { useSnack } from '../../../../providers/SnackBarProvider';
import useCustomers from '../../../../customers/hooks/useCustomers';

export default function ContactPage() {
    const { customer } = useCurrentCustomer()
    const { sendContactMessage } = useCustomers()
    const setSnack = useSnack()
    const handleEmailClick = () => {
        window.open("https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRlRjDzSSfkVccqcZfzdnmLbTbHrKLDtdHXRQXqfdCWjcXCzlHBCppRdQbTdQCXSvcXRZBl", "_blank");
    };

    const handleSubmit = async (data) => {
        const message = data.messagehere
        try {
            let customerAfterMessage = await sendContactMessage(message, customer._id)
            if (customerAfterMessage) {
                setSnack("success", "Your message has been successfully sent. We will reach out to you as soon as possible.")
            }
        } catch (err) {
            console.log(err);

        }


    }
    const { handleChange, error, onSubmit, isFormValid } = useForm(initialContactForm, contactSchema, handleSubmit)


    return (
        <Box sx={{ minHeight: "100vh", paddingX: 5 }}>
            <ContactComponent handleEmailClick={handleEmailClick} handleChange={handleChange} error={error} onSubmit={onSubmit} isFormValid={isFormValid} customer={customer} setSnack={setSnack} />
        </Box>
    );
}
