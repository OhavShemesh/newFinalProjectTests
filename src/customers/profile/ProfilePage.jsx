import React, { useEffect, useState } from 'react';
import ProfileComponent from './components/ProfileComponent';
import { useCurrentCustomer } from '../provider/UserProvider';
import useCustomers from '../hooks/useCustomers';
import useForm from '../../formHelpers/useForm';
import signupSchema from '../../formHelpers/schemas/signupSchema';
import { Container, Typography } from '@mui/material';

export default function ProfilePage() {
    const { customer } = useCurrentCustomer();
    const [customerDetails, setCustomerDetails] = useState(null);
    const { getCustomerById } = useCustomers();
    const [isLoading, setIsLoading] = useState(true);
    const [formValues, setFormValues] = useState({});

    const initialEditProfileForm = (details) => ({
        first: details?.name?.first || "",
        middle: details?.name?.middle || "",
        last: details?.name?.last || "",
        phone: details?.phone || "",
        email: details?.email || "",
        password: details?.password || "",
        url: details?.image?.url || "",
        alt: details?.image?.alt || "",
        city: details?.address?.city || "",
        street: details?.address?.street || "",
        houseNumber: details?.address?.houseNumber || "",
        zip: details?.address?.zip || "",
    });

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            if (customer) {
                try {
                    const details = await getCustomerById(customer._id);
                    setCustomerDetails(details);
                    setFormValues(initialEditProfileForm(details));
                } catch (err) {
                    console.log(err);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchCustomerDetails();
    }, [customer]);

    const handleSubmit = (data) => {
        console.log(data);
    };

    let formValuesAfter

    useEffect(() => {
        if (formValues) {
            formValuesAfter = formValues
        }
        console.log("formvalues", formValuesAfter);

    }, [formValues])


    const { handleChange, error, onSubmit, isFormValid } = useForm(
        formValuesAfter,
        signupSchema,
        handleSubmit
    );

    if (isLoading || !Object.keys(formValues).length) {
        return (
            <Container>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    return (
        <>
            <Container sx={{ borderBottom: "1px dotted grey" }}>
                <Typography sx={{ pb: 2 }} textAlign={"center"} variant="h2">Profile Page</Typography>
            </Container>
            <ProfileComponent
                customerDetails={customerDetails}
                handleChange={handleChange}
                error={error}
                onSubmit={onSubmit}
                isFormValid={isFormValid}
            />
        </>
    );
}
