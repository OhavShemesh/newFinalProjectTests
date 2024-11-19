import React, { useState } from 'react'
import ProfileComponent from './ProfileComponent'
import useForm from '../../../formHelpers/useForm';
import signupSchema from '../../../formHelpers/schemas/signupSchema';
import useCustomers from '../../hooks/useCustomers';
import { useSnack } from '../../../providers/SnackBarProvider';
import { CircularProgress } from '@mui/material';

export default function MiddleProfileComponent({ formValues, customerDetails, customer }) {

    const { updateCustomer } = useCustomers()
    const setSnack = useSnack()
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data) => {
        try {
            setLoading(true);
            const fixData = {
                name: {
                    first: data.first,
                    middle: data.middle,
                    last: data.last,
                },
                phone: data.phone,
                email: data.email,
                password: data.password,
                image: {
                    url: data.url,
                    alt: data.alt
                },
                address: {
                    city: data.city,
                    street: data.street,
                    houseNumber: data.houseNumber,
                    zip: data.zip
                }

            }

            const customerAfterChange = await updateCustomer(customer?._id, fixData)
            if (customerAfterChange) {
                setSnack("success", "Changes Updated")
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    };

    const { handleChange, error, onSubmit, isFormValid } = useForm(
        formValues,
        signupSchema,
        handleSubmit
    );

    return (
        <ProfileComponent
            customerDetails={customerDetails}
            handleChange={handleChange}
            error={error}
            onSubmit={onSubmit}
            isFormValid={isFormValid}
        />

    )
}
