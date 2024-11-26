import React, { useEffect, useState } from 'react'
import StatisticsComponent from '../StatisticsComponent'
import { Box, Typography } from '@mui/material'
import useProducts from '../../../../products/hooks/useProducts'
import useCustomers from '../../../../customers/hooks/useCustomers'
import FilterStatistics from '../../../helpers/FilterStatistics'
import useOrders from '../../../../orders/hooks/useOrders'

export default function StatisticsManager() {
    const { allProducts } = useProducts()
    const { getAllCustomers } = useCustomers()
    const { toTitleCase } = useProducts()
    const { getAllOrders } = useOrders()
    const [allCustomers, setAllCustomers] = useState([])
    const [filter, setFilter] = useState("likes")
    const [allOrders, setAllOrders] = useState({})

    useEffect(() => {
        const fetchAllCustomers = async () => {
            try {
                const customers = await getAllCustomers()
                setAllCustomers(customers || [])
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllCustomers()
    }, [])

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const orders = await getAllOrders()
                setAllOrders(orders)
            } catch (err) {
                console.log(err);

            }
        }
        fetchAllOrders()
    }, [])


    const countProductsInOrders = (product_id) => {
        let count = 0;

        allOrders.forEach((order) => {
            order.productsAndQuantity.forEach((product) => {

                if (product.id === product_id) {
                    count += product.quantity;
                }
            });
        });

        return count;
    };

    const countProductLikes = (product_id) => {
        let count = 0
        allCustomers.forEach((customer) => {
            if (customer?.likes && customer.likes.includes(product_id)) {
                count += 1
            }
        })
        return count;
    }

    return (
        <Box sx={{ height: "100%", backgroundColor: "white" }}>
            <Typography sx={{ textAlign: "center", py: 2, color: "black", fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" } }} variant='h3'>Statistics</Typography>
            <FilterStatistics setFilter={setFilter} filter={filter} />
            <StatisticsComponent allProducts={allProducts} countProductLikes={countProductLikes} filter={filter} toTitleCase={toTitleCase} countProductsInOrders={countProductsInOrders} />
        </Box>
    )
}
