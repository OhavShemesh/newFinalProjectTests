import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, IconButton, Button, Box, Typography } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

export default function OrdersComponent({ orders, fetchProduct, toTitleCase, handleUpdateStatus, fetchCustomerName }) {
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
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>ORDER ID</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>CUSTOMER'S PHONE</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>DELIVERY CITY</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>PRODUCTS AND QUANTITY</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>STATUS</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>PLACED AT</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allOrders?.map((order) => (
                        <React.Fragment key={order._id}>
                            <TableRow onClick={() => handleExpand(order._id, order.customer_id)} sx={{ cursor: 'pointer' }}>
                                <TableCell>
                                    <IconButton size="small">
                                        {expandedOrderId === order._id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">{order._id}</TableCell>
                                <TableCell align="center">{order?.phone}</TableCell>
                                <TableCell align="center">{toTitleCase(order?.address.city)}</TableCell>
                                <TableCell align="center">{order?.productsAndQuantity.length}</TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        color: order?.status === "Pending"
                                            ? "orange"
                                            : order?.status === "In Progress"
                                                ? "#00BFFF"
                                                : order?.status === "Complete"
                                                    ? "green"
                                                    : "green"
                                    }}
                                >
                                    {order?.status}
                                </TableCell>
                                <TableCell align="center">
                                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell colSpan={7} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                                    <Collapse sx={{ backgroundColor: "#ECECEC" }} in={expandedOrderId === order._id} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 2 }}>
                                            <Typography variant="h5" gutterBottom component="div" sx={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>
                                                Customer's Name
                                            </Typography>
                                            <Typography variant='h6' sx={{ textAlign: "center", paddingBottom: "2%" }}>{toTitleCase(customerNames[order.customer_id]) || "Loading..."}</Typography>
                                            <Typography variant="h5" gutterBottom component="div" sx={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>
                                                Full Address
                                            </Typography>
                                            <Table sx={{ width: "50%", margin: "auto" }}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center" sx={{ fontWeight: "bold" }}>City</TableCell>
                                                        <TableCell align="center" sx={{ fontWeight: "bold" }}>Street</TableCell>
                                                        <TableCell align="center" sx={{ fontWeight: "bold" }}>House Number</TableCell>
                                                        <TableCell align="center" sx={{ fontWeight: "bold" }}>Zip</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell align="center">{toTitleCase(order?.address.city)}</TableCell>
                                                        <TableCell align="center">{toTitleCase(order?.address.street)}</TableCell>
                                                        <TableCell align="center">{order?.address.houseNumber}</TableCell>
                                                        <TableCell align="center">{order?.address.zip}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>

                                            <Typography variant="h5" gutterBottom component="div" sx={{ textAlign: "center", fontWeight: "bold", marginTop: "2%", textDecoration: "underline" }}>
                                                Products and Quantities
                                            </Typography>
                                            <Table sx={{ width: "70%", margin: "auto" }}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center" sx={{ fontWeight: "bold" }}>Product Name</TableCell>
                                                        <TableCell align="center" sx={{ fontWeight: "bold" }}>Quantity</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {order.productsAndQuantity.map((product) => (
                                                        <TableRow key={product._id}>
                                                            <TableCell align="center">
                                                                {productNames[product.id] || "Loading..."}
                                                            </TableCell>
                                                            <TableCell align="center">{product.quantity}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>

                                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                                <Button onClick={() => handleUpdateStatus(order?._id, "Pending")} variant="contained" color="warning" sx={{ marginRight: 1 }}>
                                                    Pending
                                                </Button>
                                                <Button onClick={() => handleUpdateStatus(order?._id, "In Progress")} variant="contained" color="info" sx={{ marginRight: 1 }}>
                                                    In Progress
                                                </Button>
                                                <Button onClick={() => handleUpdateStatus(order?._id, "Completed")} variant="contained" color="success">
                                                    Complete
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}

                </TableBody>
            </Table>
        </TableContainer >
    );
}
