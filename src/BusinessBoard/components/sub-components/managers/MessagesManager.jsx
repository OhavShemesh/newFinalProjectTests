import React, { useEffect, useState } from 'react'
import MessagesComponent from '../MessagesComponent'
import { Typography } from '@mui/material'
import { useCurrentCustomer } from '../../../../customers/provider/UserProvider'
import useCustomers from '../../../../customers/hooks/useCustomers'
import useProducts from "../../../../products/hooks/useProducts"
import { useSnack } from "../../../../providers/SnackBarProvider"

export default function MessagesManager() {
    const { customer } = useCurrentCustomer()
    const { getAllCustomers, deleteContactMessage } = useCustomers()
    const { toTitleCase } = useProducts()
    const [customerDetails, setCustomerDetails] = useState()
    const [allCustomersDetails, setAllCustomersDetails] = useState()
    const setSnack = useSnack()


    useEffect(() => {
        if (customer) {
            const fetchAllCustomers = async () => {
                try {
                    let fetchedCustomers = await getAllCustomers()
                    setAllCustomersDetails(fetchedCustomers)
                } catch (err) {
                    console.log(err);

                }
            }
            fetchAllCustomers()
        }
    }, [])

    const handleDeleteMessage = async (message, customerId) => {
        try {
            await deleteContactMessage(message, customerId);

            setAllCustomersDetails((prevCustomers) =>
                prevCustomers.map((customer) => {
                    if (customer._id === customerId) {
                        return {
                            ...customer,
                            messages: customer.messages.filter((msg) => msg.message !== message),
                        };
                    }
                    return customer;
                })
            );

            setSnack("success", "Message Deleted");
        } catch (err) {
            console.log(err);
        }
    };

    const handleCompleteMessage = async (message, customerId) => {
        try {
            await deleteContactMessage(message, customerId);

            setAllCustomersDetails((prevCustomers) =>
                prevCustomers.map((customer) => {
                    if (customer._id === customerId) {
                        return {
                            ...customer,
                            messages: customer.messages.filter((msg) => msg.message !== message),
                        };
                    }
                    return customer;
                })
            );

            setSnack("success", "Message Completed");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Typography sx={{ textAlign: "center", pt: 2, pb: 5, color: "black" }} variant="h3">MANAGE CUSTOMER MESSAGES</Typography>
            <MessagesComponent allCustomersDetails={allCustomersDetails} toTitleCase={toTitleCase} handleDeleteMessage={handleDeleteMessage} handleCompleteMessage={handleCompleteMessage} />
        </>
    )
}
