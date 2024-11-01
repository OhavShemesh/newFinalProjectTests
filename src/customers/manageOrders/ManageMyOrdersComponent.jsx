import { Box, ImageListItem, Typography } from '@mui/material';
import React from 'react';

export default function ManageMyOrdersComponent({ customerDetails, toTitleCase, customerOrders, productImages }) {
    return (
        <Box>
            <Typography paddingTop={2} textAlign={"center"} variant='h3'>
                {`${toTitleCase(customerDetails?.name.first)} ${toTitleCase(customerDetails?.name.last)}'s Orders`}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginTop: "3%" }}>
                {customerOrders.map((order) => {
                    return (
                        <Box
                            key={order._id}
                            sx={{
                                border: "1px solid black",
                                width: "50%",
                                height: "100px",
                                borderRadius: "30px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                paddingY: "2%",
                                gap: 2
                            }}
                        >
                            <Typography variant='h6'>
                                {new Date(order.createdAt).toLocaleDateString("en-GB")}
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
                                {order.productsAndQuantity.map((product) => {
                                    const image = productImages[product.id];
                                    return (
                                        image && (
                                            <ImageListItem key={product.id} sx={{ width: "20%", maxWidth: "50px" }}>
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
                            <Typography color={
                                order.status === "Pending" ? "orange" :
                                    order.status === "In Progress" ? "blue" :
                                        order.status === "Complete" ? "green" : "black"
                            }>
                                {order.status}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}
