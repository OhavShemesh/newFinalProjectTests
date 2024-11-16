import React from 'react'
import ProfileComponent from './ProfileComponent'
import useForm from '../../../formHelpers/useForm';
import signupSchema from '../../../formHelpers/schemas/signupSchema';
import useCustomers from '../../hooks/useCustomers';
import { useSnack } from '../../../providers/SnackBarProvider';

export default function MiddleProfileComponent({ formValues, customerDetails, customer }) {

    const { updateCustomer } = useCustomers()
    const setSnack = useSnack()

    const handleSubmit = async (data) => {
        try {
            console.log("data", data);

            const customerAfterChange = await updateCustomer(customer?._id, data)
            if (customerAfterChange) {
                setSnack("success", "Changes Updated")
            }
        } catch (err) {
            console.log(err);

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
