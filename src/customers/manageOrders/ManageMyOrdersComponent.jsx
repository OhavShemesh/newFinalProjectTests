import { Box, ImageListItem, Typography, Collapse, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

export default function ManageMyOrdersComponent({ customerDetails, toTitleCase, customerOrders, productImages, fetchProductName, getTotalOrderPrice, handleCancleOrder }) {
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [productNames, setProductNames] = useState({});
    const [orderPrices, setOrderPrices] = useState({});

    const toggleExpand = (orderId) => {
        setExpandedOrderId(prevId => (prevId === orderId ? null : orderId));
    };

    useEffect(() => {
        const fetchNames = async () => {
            const names = {};
            for (const order of customerOrders) {
                for (const product of order.productsAndQuantity) {
                    if (!names[product.id]) {
                        names[product.id] = await fetchProductName(product.id);
                    }
                }
            }
            setProductNames(names);
        };

        fetchNames();
    }, [customerOrders, fetchProductName]);

    useEffect(() => {
        const fetchOrderPrices = async () => {
            const prices = {};
            for (const order of customerOrders) {
                prices[order._id] = await getTotalOrderPrice(order);
            }
            setOrderPrices(prices);
        };

        fetchOrderPrices();
    }, [customerOrders, getTotalOrderPrice]);

    return (
        <Box>
            <Typography paddingTop={2} textAlign="center" variant="h3">
                {`${toTitleCase(customerDetails?.name.first)} ${toTitleCase(customerDetails?.name.last)}'s Orders`}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginTop: "3%" }}>
                {customerOrders.map((order) => {
                    const totalPrice = orderPrices[order._id];

                    return (
                        <Box
                            key={order._id}
                            sx={{
                                border: "1px solid black",
                                width: "50%",
                                borderRadius: "30px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                paddingY: "3%",
                                gap: 3,
                                cursor: 'pointer',
                            }}
                            onClick={() => toggleExpand(order._id)}
                        >
                            <Typography sx={{ fontWeight: "bold" }} variant="h6">
                                {new Date(order.createdAt).toLocaleDateString("en-GB")}
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 1.5, justifyContent: "center" }}>
                                {order.productsAndQuantity.map((product) => {
                                    const image = productImages[product.id];
                                    return (
                                        image && (
                                            <ImageListItem key={product.id} sx={{ maxWidth: "50px" }}>
                                                <img
                                                    src={image.url}
                                                    alt={image.alt}
                                                    style={{ width: "100%", height: "100%", borderRadius: "10px", border: "1px dotted black" }}
                                                />
                                            </ImageListItem>
                                        )
                                    );
                                })}
                            </Box>
                            <Typography sx={{ fontWeight: "bold" }} color={
                                order.status === "Pending" ? "orange" :
                                    order.status === "In Progress" ? "#00BFFF" :
                                        order.status === "Completed" ? "green" : "black"
                            }>
                                {order.status}
                            </Typography>

                            <Collapse in={expandedOrderId === order._id}>
                                <Box sx={{ padding: 2 }}>
                                    <Typography sx={{ textAlign: "center" }} variant="body1">
                                        <strong>Products In Order</strong>
                                    </Typography>
                                    <div>
                                        <ul>
                                            {order.productsAndQuantity.map((product) => (
                                                <li key={product.id}>
                                                    {product.quantity} x {toTitleCase(productNames[product.id]) || "Unknown Product"}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <Typography sx={{ textAlign: "center" }} variant="body1">
                                        <strong>Total Price</strong>
                                    </Typography>
                                    <Typography sx={{ textAlign: "center" }} variant="body2">
                                        {totalPrice !== undefined ? `₪${totalPrice}` : "Calculating..."}
                                    </Typography>
                                </Box>
                                {order?.status === "Pending" &&
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <Button onClick={() => handleCancleOrder(order._id)} variant='contained' sx={{ backgroundColor: "black" }}>Cancle Order</Button>
                                    </Box>
                                }
                            </Collapse>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}
