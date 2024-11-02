import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import useOrders from '../../../../orders/hooks/useOrders'
import useProducts from '../../../../products/hooks/useProducts'
import useCustomers from '../../../../customers/hooks/useCustomers'
import OrdersComponent from '../OrdersComponent'

export default function OrdersManager() {
    const { getCustomerById } = useCustomers()
    const { getAllOrders, updateOrderStatus } = useOrders()
    const { getProductById, toTitleCase } = useProducts()
    const [allOrders, setAllOrders] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [somethingChanged, setSomethingChanged] = useState(false)

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
        <>
            <Typography sx={{ textAlign: "center", pt: 2, pb: 5 }} variant="h3">MANAGE ORDERS</Typography>
            <OrdersComponent orders={allOrders} fetchProduct={fetchProduct} toTitleCase={toTitleCase} handleUpdateStatus={handleUpdateStatus} fetchCustomerName={fetchCustomerName} />
        </>
    )
}
