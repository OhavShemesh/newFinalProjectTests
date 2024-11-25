import React, { useEffect, useState } from 'react'
import ManageCustomersCompoenent from '../ManageCustomersCompoenent'
import { Box, Typography } from '@mui/material'
import useCustomers from '../../../../customers/hooks/useCustomers'
import useProducts from '../../../../products/hooks/useProducts'

export default function ManageCustomers() {
    const [allCustomers, setAllCustomers] = useState({})
    const { getAllCustomers, changeBusinessStatus } = useCustomers()
    const { toTitleCase } = useProducts()
    const [isloading, setIsLoading] = useState(true)
    const [somethingChanged, setSomethingChanged] = useState(false)

    useEffect(() => {
        const fetchAllCustomers = async () => {
            try {
                const customers = await getAllCustomers()
                setAllCustomers(customers)
            } catch (err) {
                console.log(err);

            } finally {
                setIsLoading(false)
                setSomethingChanged(false)
            }
        }
        fetchAllCustomers()
    }, [somethingChanged])


    const handleChangeStatus = async (customer_id) => {
        try {
            await changeBusinessStatus(customer_id)
            setSomethingChanged(true)
        } catch (err) {
            console.log(err);

        }
    }




    if (isloading) {
        return <Typography>Loading...</Typography>
    }

    return (
        <Box sx={{ height: "100vh", backgroundColor: "white" }}>
            <Typography sx={{ textAlign: "center", py: 2, color: "black", fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" } }} variant='h3'>Manage Customers</Typography>
            <ManageCustomersCompoenent allCustomers={allCustomers} toTitleCase={toTitleCase} handleChangeStatus={handleChangeStatus} />
        </Box>
    )
}
