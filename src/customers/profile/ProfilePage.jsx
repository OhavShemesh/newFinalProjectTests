import React, { useEffect, useState } from 'react';
import ProfileComponent from './components/ProfileComponent';
import { useCurrentCustomer } from '../provider/UserProvider';
import useCustomers from '../hooks/useCustomers';
import useForm from '../../formHelpers/useForm';
import signupSchema from '../../formHelpers/schemas/signupSchema';
import { Box, Container, Typography } from '@mui/material';
import MiddleProfileComponent from './components/MiddleProfileComponent';
import { ClipLoader } from 'react-spinners';

export default function ProfilePage() {
    const { customer } = useCurrentCustomer();
    const [customerDetails, setCustomerDetails] = useState(null);
    const { getCustomerById } = useCustomers();
    const [isLoading, setIsLoading] = useState(true);
    const [formValues, setFormValues] = useState(null);

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            if (customer) {
                try {
                    const details = await getCustomerById(customer._id);
                    setCustomerDetails(details);
                } catch (err) {
                    console.log(err);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchCustomerDetails();
    }, [customer]);

    useEffect(() => {
        if (customerDetails) {
            const initialEditForm = {
                first: customerDetails?.name.first || '',
                middle: customerDetails?.name.middle || '',
                last: customerDetails?.name.last || '',
                phone: customerDetails?.phone || '',
                email: customerDetails?.email || '',
                password: customerDetails?.password || '',
                url: customerDetails?.image.url || '',
                alt: customerDetails?.image.alt || '',
                city: customerDetails?.address.city || '',
                street: customerDetails?.address.street || '',
                houseNumber: customerDetails?.address.houseNumber || '',
                zip: customerDetails?.address.zip || '',
            };
            setFormValues(initialEditForm);
        }
    }, [customerDetails]);



    if (isLoading || !formValues) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center", width: "100%", pt: 40 }}>
                <ClipLoader size={"60px"} color="turquoise" cssOverride={{ fontWeight: "900" }} />
            </Box>
        )
    }

    return (
        <Box sx={{ height: "100vh", backgroundColor: "white" }}>
            <Container sx={{ borderBottom: "1px dotted grey" }}>
                <Typography sx={{ pb: 2, color: "black", fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" } }} textAlign={"center"} variant="h2">
                    Profile Page
                </Typography>
            </Container>
            <MiddleProfileComponent formValues={formValues} customerDetails={customerDetails} customer={customer} />
        </Box>
    );
}
