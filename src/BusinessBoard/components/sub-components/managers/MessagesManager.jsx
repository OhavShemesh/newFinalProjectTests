import React, { useCallback, useEffect, useState } from 'react'
import MessagesComponent from '../MessagesComponent'
import { Box, Typography } from '@mui/material'
import { useCurrentCustomer } from '../../../../customers/provider/UserProvider'
import useCustomers from '../../../../customers/hooks/useCustomers'
import useProducts from "../../../../products/hooks/useProducts"
import { useSnack } from "../../../../providers/SnackBarProvider"

export default function MessagesManager() {
    const { customer } = useCurrentCustomer()
    const { getAllCustomers, deleteContactMessage, sendEmail } = useCustomers()
    const { toTitleCase } = useProducts()
    const [customerDetails, setCustomerDetails] = useState()
    const [allCustomersDetails, setAllCustomersDetails] = useState()
    const [responseData, setResponseData] = useState("")
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

    const handleOnChange = useCallback((e) => {
        const { value } = e.target;
        setResponseData(value)
    })

    const handleDeleteMessage = async (message, customerId, customerEmail) => {
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
            await sendEmail(customerEmail, "Deleted Message", `Dear Customer, 

Apologies, but your message: "${message}" has been deleted due to its irrelevance.

Best regards,  
Your Support Team`);

            setSnack("success", "Message Deleted");
        } catch (err) {
            console.log(err);
        }
    };

    const handleCompleteMessage = async (message, customerId, customerEmail) => {
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
            await sendEmail(customerEmail, "Completed Message", `Dear Customer,

We would like to inform you that your message: "${message}" has been reviewed and marked as completed.

Thank you for reaching out to us. If you have any further questions or concerns, please do not hesitate to contact us again.

Best regards,  
Your Support Team`);
            setSnack("success", "Message Completed");
        } catch (err) {
            console.log(err);
        }
    }

    const handleResponseMessage = async (message, customerId, customerEmail) => {
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

            await sendEmail(customerEmail, "Response Message", `Dear Customer, 

Thank you for reaching out to us. We would like to inform you that your message: "${message}" has been reviewed, and we have provided a response: "${responseData}". 

If you have any further questions or concerns, please do not hesitate to contact us. We’re here to help.

Best regards,  
Your Support Team`);
            setResponseData("")
            setSnack("success", "Message Completed And Response Sent");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Box sx={{ height: "100vh", backgroundColor: "white" }}>
            <Typography sx={{ textAlign: "center", py: 2, color: "black", fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" } }} variant='h3'>Manage Messages</Typography>
            <MessagesComponent allCustomersDetails={allCustomersDetails} toTitleCase={toTitleCase} handleDeleteMessage={handleDeleteMessage} handleCompleteMessage={handleCompleteMessage} handleResponseMessage={handleResponseMessage} handleOnChange={handleOnChange} />
        </Box>
    )
}
