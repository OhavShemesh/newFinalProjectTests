import React, { useEffect, useState } from 'react'
import StatisticsComponent from '../StatisticsComponent'
import { Box, Typography } from '@mui/material'
import useProducts from '../../../../products/hooks/useProducts'
import useCustomers from '../../../../customers/hooks/useCustomers'

export default function StatisticsManager() {
    const { allProducts } = useProducts()
    const { getAllCustomers } = useCustomers()
    const [allCustomers, setAllCustomers] = useState([])

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
            <StatisticsComponent allProducts={allProducts} countProductLikes={countProductLikes} />
        </Box>
    )
}
