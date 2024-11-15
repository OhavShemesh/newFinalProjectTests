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
                    {allOrders?.map((order) => (
                        <React.Fragment key={order._id}>
                            <TableRow onClick={() => handleExpand(order._id, order.customer_id)} sx={{ cursor: 'pointer' }}>
                                <TableCell sx={{ width: "6%" }}>
                                    <IconButton size="small">
                                        {expandedOrderId === order._id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                    </IconButton>
                                </TableCell>
                                <TableCell sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }} align="center">{order?._id}</TableCell>
                                <TableCell sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }} align="center">{order?.phone}</TableCell>
                                <TableCell sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }} align="center">{toTitleCase(order?.address.city)}</TableCell>
                                <TableCell sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }} align="center">{order?.productsAndQuantity.length}</TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontSize: { xs: "10px", sm: "12px", md: "16px" },
                                        width: "15.5%",
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
                                <TableCell sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }} align="center">
                                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell colSpan={7} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                                    <Collapse sx={{ backgroundColor: "white", filter: "brightness(0.9)" }} in={expandedOrderId === order._id} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 2 }}>
                                            <Typography variant="h5" gutterBottom component="div" sx={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline", fontSize: { xs: "18px", sm: "20px", md: "24px" } }}>
                                                Customer's Name
                                            </Typography>
                                            <Typography variant='h6' sx={{ textAlign: "center", paddingBottom: "2%", fontSize: { xs: "14px", sm: "16px", md: "20px" } }}>{toTitleCase(customerNames[order.customer_id]) || "Loading..."}</Typography>
                                            <Typography variant="h5" gutterBottom component="div" sx={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline", fontSize: { xs: "18px", sm: "20px", md: "24px" } }}>
                                                Full Address
                                            </Typography>
                                            <Table sx={{ width: "50%", margin: "auto" }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: { xs: "10px", sm: "12px", md: "18px" } }}>City</TableCell>
                                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: { xs: "10px", sm: "12px", md: "18px" } }}>Street</TableCell>
                                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: { xs: "10px", sm: "12px", md: "18px" } }}>House Number</TableCell>
                                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: { xs: "10px", sm: "12px", md: "18px" } }}>Zip</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell align="center" sx={{ fontSize: { xs: "8px", sm: "10px", md: "14px" } }}>{toTitleCase(order?.address.city)}</TableCell>
                                                        <TableCell align="center" sx={{ fontSize: { xs: "8px", sm: "10px", md: "14px" } }}>{toTitleCase(order?.address.street)}</TableCell>
                                                        <TableCell align="center" sx={{ fontSize: { xs: "8px", sm: "10px", md: "14px" } }}>{order?.address.houseNumber}</TableCell>
                                                        <TableCell align="center" sx={{ fontSize: { xs: "8px", sm: "10px", md: "14px" } }}>{order?.address.zip}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                            <Typography variant="h5" gutterBottom component="div" sx={{ textAlign: "center", fontWeight: "bold", textDecoration: "underline", fontSize: { xs: "18px", sm: "20px", md: "24px" }, marginTop: 2 }}>
                                                Products and Quantities
                                            </Typography>
                                            <Table sx={{ width: { xs: "50%", sm: "60%", md: "70%" }, margin: "auto" }}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: { xs: "10px", sm: "12px", md: "18px" } }}>Product Name</TableCell>
                                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: { xs: "10px", sm: "12px", md: "18px" } }}>Quantity</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {order.productsAndQuantity.map((product, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell align="center" sx={{ fontSize: { xs: "8px", sm: "10px", md: "14px" } }}>
                                                                {productNames[product.id] || "Loading..."}
                                                            </TableCell>
                                                            <TableCell align="center" sx={{ fontSize: { xs: "8px", sm: "10px", md: "14px" } }}>{product.quantity}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>

                                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, gap: 1 }}>
                                                <Button onClick={() => handleUpdateStatus(order?._id, "Pending")} variant="contained" color="warning" sx={{ minWidth: "unset", fontSize: { xs: "8px", sm: "10px", md: "14px" }, padding: { xs: 0.5, sm: 0.7, md: 1 } }}>
                                                    Pending
                                                </Button>
                                                <Button onClick={() => handleUpdateStatus(order?._id, "In Progress")} variant="contained" color="info" sx={{ minWidth: "unset", fontSize: { xs: "8px", sm: "10px", md: "14px" }, padding: { xs: 0.5, sm: 0.7, md: 1 } }}>
                                                    In Progress
                                                </Button>
                                                <Button onClick={() => handleUpdateStatus(order?._id, "Completed")} variant="contained" color="success" sx={{ minWidth: "unset", fontSize: { xs: "8px", sm: "10px", md: "14px" }, padding: { xs: 0.5, sm: 0.7, md: 1 } }}>
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
