import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, IconButton, Button, Box, Typography } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

export default function OrdersComponent({ orders, fetchProduct, toTitleCase, handleUpdateStatus, fetchCustomerName, filter }) {
    const [allOrders, setAllOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [productNames, setProductNames] = useState({});
    const [customerNames, setCustomerNames] = useState({});
    const fetchedProductIds = useRef(new Set());

    useEffect(() => {
        setAllOrders(orders);

        const fetchAllProductNames = async () => {
            const names = {};
            for (const order of orders) {
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

        if (orders.length) {
            fetchAllProductNames();
        }
    }, [orders, fetchProduct]);

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

    return (
        <TableContainer component={Paper}>
            <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: "6%" }} />
                        <TableCell align="center" sx={{ fontWeight: "bold", width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>ORDER ID</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>CUSTOMER'S PHONE</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>DELIVERY CITY</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>PRODUCTS AND QUANTITY</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>STATUS</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>PLACED AT</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allOrders
                        ?.filter((order) => filter === "All" || order.status === filter) // Filter logic
                        .map((order) => (
                            <React.Fragment key={order._id}>
                                <TableRow onClick={() => handleExpand(order._id, order.customer_id)} sx={{ cursor: 'pointer' }}>
                                    <TableCell sx={{ width: "6%" }}>
                                        <IconButton size="small">
                                            {expandedOrderId === order._id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }} align="center">
                                        {order?._id}
                                    </TableCell>
                                    <TableCell sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }} align="center">
                                        {order?.phone}
                                    </TableCell>
                                    <TableCell sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }} align="center">
                                        {toTitleCase(order?.address.city)}
                                    </TableCell>
                                    <TableCell sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }} align="center">
                                        {order?.productsAndQuantity.length}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontSize: { xs: "10px", sm: "12px", md: "16px" },
                                            width: "15.5%",
                                            color: order?.status === "Pending"
                                                ? "orange"
                                                : order?.status === "In Progress"
                                                    ? "#00BFFF"
                                                    : "green",
                                        }}
                                    >
                                        {order?.status}
                                    </TableCell>
                                    <TableCell sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }} align="center">
                                        {new Date(order.createdAt).toLocaleDateString("en-GB")}
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                </TableBody>

            </Table>
        </TableContainer >
    );
}
