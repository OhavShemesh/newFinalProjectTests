import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import useOrders from '../../../../orders/hooks/useOrders'
import useProducts from '../../../../products/hooks/useProducts'
import useCustomers from '../../../../customers/hooks/useCustomers'
import OrdersComponent from '../OrdersComponent'
import FilterOrdersComponent from '../FilterOrdersComponent'

export default function OrdersManager() {
    const { getCustomerById } = useCustomers()
    const { getAllOrders, updateOrderStatus } = useOrders()
    const { getProductById, toTitleCase } = useProducts()
    const [allOrders, setAllOrders] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [somethingChanged, setSomethingChanged] = useState(false)
    const [filter, setFilter] = useState("All")

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                let orders = await getAllOrders()
                setAllOrders(orders)
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false)
                setSomethingChanged(false)
            }
        }
        fetchAllOrders()
    }, [somethingChanged])

    const fetchProduct = async (id) => {
        try {
            let product = await getProductById(id)

            return product
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            let orderAfterChange = await updateOrderStatus(orderId, newStatus)
            if (orderAfterChange) {
                setSomethingChanged(true)
            }
        } catch (err) {
            console.log(err);

        }
    }
    const fetchCustomerName = async (customer_id) => {
        try {
            const nameArr = []
            let customer = await getCustomerById(customer_id)
            let customerFirstName = String(`${customer.name.first} ${customer.name.middle || ""} ${customer.name.last}`)
            nameArr.push(customerFirstName)

            return nameArr

        } catch (err) {
            console.log(err);

        }
    }


    if (isLoading) {
        return <Typography>Loading...</Typography>
    }

    return (
        <Box sx={{ height: "100vh", backgroundColor: "white" }}>
            <Typography sx={{ textAlign: "center", py: 2, color: "black", fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" } }} variant='h3'>Manage Orders</Typography>
            <FilterOrdersComponent setFilter={setFilter} />
            <OrdersComponent orders={allOrders} fetchProduct={fetchProduct} toTitleCase={toTitleCase} handleUpdateStatus={handleUpdateStatus} fetchCustomerName={fetchCustomerName} filter={filter} />
        </Box>
    )
}
