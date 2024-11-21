import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Collapse,
    IconButton,
    Box,
    Typography,
    Button,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

export default function OrdersComponent({
    allOrders,
    toTitleCase,
    filter,
    expandedOrderId,
    productNames,
    handleExpand,
    handleUpdateStatus
}) {
    return (
        <TableContainer component={Paper} sx={{ paddingBottom: 20 }}>
            <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: "6%" }} />
                        <TableCell align="center" sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>ORDER ID</TableCell>
                        <TableCell align="center" sx={{
                            width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" }, whiteSpace: "nowrap"
                        }}>CUSTOMER'S PHONE</TableCell>
                        <TableCell align="center" sx={{
                            width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" }, whiteSpace: "nowrap"
                        }}>DELIVERY CITY</TableCell>
                        <TableCell align="center" sx={{
                            width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" }, whiteSpace: "nowrap"
                        }}>PRODUCTS AND QUANTITY</TableCell>
                        <TableCell align="center" sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>STATUS</TableCell>
                        <TableCell align="center" sx={{
                            width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" }, whiteSpace: "nowrap"
                        }}>PLACED AT</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allOrders?.length > 0 ? (
                        allOrders
                            .filter((order) => filter === "All" || order.status === filter)
                            .map((order) => (
                                <React.Fragment key={order._id}>
                                    <TableRow
                                        onClick={() => handleExpand(order._id, order.customer_id)}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell sx={{ width: "6%" }}>
                                            <IconButton
                                                size="small"
                                                aria-label={`Expand order ${order._id}`}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {expandedOrderId === order._id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="center" sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>{order?._id}</TableCell>
                                        <TableCell align="center" sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>{order?.phone}</TableCell>
                                        <TableCell align="center" sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>
                                            {toTitleCase(order?.address.city)}
                                        </TableCell>
                                        <TableCell align="center" sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>
                                            {order?.productsAndQuantity.length}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                width: "15.5%",
                                                fontSize: { xs: "10px", sm: "12px", md: "16px" },
                                                color: order?.status === "Pending" ? "orange" :
                                                    order?.status === "In Progress" ? "#00BFFF" :
                                                        order?.status === "Completed" ? "green" :
                                                            "gray",
                                            }}
                                        >
                                            {order?.status}
                                        </TableCell>
                                        <TableCell align="center" sx={{ width: "15.5%", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>
                                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-GB") : 'N/A'}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ backgroundColor: "lightgrey" }}>
                                        <TableCell colSpan={7} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                                            <Collapse in={expandedOrderId === order._id} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 2 }}>
                                                    <Typography
                                                        textAlign="center"
                                                        sx={{ fontWeight: 'bold', fontSize: { xs: "16px", sm: "18px", md: "24px" } }}
                                                        variant="h5"
                                                        gutterBottom
                                                    >
                                                        Products and Quantities
                                                    </Typography>
                                                    <Box
                                                        sx={{ borderBottom: "1px dotted", width: "70%", margin: "auto" }}
                                                    ></Box>
                                                    <Table sx={{ width: "50%", margin: "auto" }}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell align="center" sx={{ fontWeight: "bold", color: "black", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>Product</TableCell>
                                                                <TableCell align="center" sx={{ fontWeight: "bold", color: "black", fontSize: { xs: "10px", sm: "12px", md: "16px" } }}>Quantity</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {order.productsAndQuantity.map((product) => (
                                                                <TableRow key={product.id}>
                                                                    <TableCell align="center" sx={{ color: "black", fontSize: { xs: "10px", sm: "12px", md: "14px" } }}>
                                                                        {productNames[product.id] || 'Loading...'}
                                                                    </TableCell>
                                                                    <TableCell align="center" sx={{ color: "black", fontSize: { xs: "10px", sm: "12px", md: "14px" } }}>
                                                                        {product?.quantity}
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}

                                                        </TableBody>
                                                    </Table>
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 3, gap: 1 }}>
                                                        <Button color='warning' variant='contained' onClick={() => handleUpdateStatus(order?._id, "Pending")}>Pending</Button>
                                                        <Button color='info' variant='contained' onClick={() => handleUpdateStatus(order?._id, "In Progress")}>In Progress</Button>
                                                        <Button color='success' variant='contained' onClick={() => handleUpdateStatus(order?._id, "Completed")}>Completed</Button>
                                                    </Box>

                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7}>
                                <Typography variant="h6" textAlign="center" sx={{ padding: 2 }}>
                                    No orders available.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
