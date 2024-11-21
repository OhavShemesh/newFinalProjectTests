import React, { useEffect, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import useOrders from '../../../../orders/hooks/useOrders'
import useProducts from '../../../../products/hooks/useProducts'
import useCustomers from '../../../../customers/hooks/useCustomers'
import OrdersComponent from '../OrdersComponent'
import FilterOrderManager from './FilterOrderManager'

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

    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [productNames, setProductNames] = useState({});
    const [customerNames, setCustomerNames] = useState({});
    const fetchedProductIds = useRef(new Set());

    useEffect(() => {
        const fetchAllProductNames = async () => {
            const names = {};
            for (const order of allOrders) {
                for (const product of order.productsAndQuantity) {
                    if (!fetchedProductIds.current.has(product.id)) {
                        const productData = await fetchProduct(product.id);
                        names[product.id] = productData?.name || "Unknown Product";
                        fetchedProductIds.current.add(product.id);
                    }
                }
            }
            setProductNames((prevNames) => ({ ...prevNames, ...names }));
        };

        if (allOrders?.length) {
            fetchAllProductNames();
        }
    }, [allOrders]);

    const toggleExpandRow = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    const getName = async (customer_id) => {
        let name = await fetchCustomerName(customer_id);
        let nameFromArray = String(name[0]);
        return nameFromArray;
    };

    const handleExpand = async (orderId, customer_id) => {
        if (expandedOrderId !== orderId) {
            const name = await getName(customer_id);
            setCustomerNames((prev) => ({ ...prev, [customer_id]: name }));
        }
        toggleExpandRow(orderId);
    };



    if (isLoading) {
        return <Typography>Loading...</Typography>
    }

    return (
        <Box sx={{ height: "100vh", backgroundColor: "white" }}>
            <Typography sx={{ textAlign: "center", py: 2, color: "black", fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" } }} variant='h3'>Manage Orders</Typography>
            <FilterOrderManager setFilter={setFilter} />
            <OrdersComponent allOrders={allOrders} fetchProduct={fetchProduct} toTitleCase={toTitleCase} handleUpdateStatus={handleUpdateStatus} fetchCustomerName={fetchCustomerName} filter={filter} expandedOrderId={expandedOrderId} productNames={productNames} handleExpand={handleExpand} />
        </Box>
    )
}
