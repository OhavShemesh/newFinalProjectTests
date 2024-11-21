import { Box, ImageListItem, Typography, Collapse, Button, List, ListItem } from '@mui/material';
import React from 'react';

export default function ManageMyOrdersComponent({
    customerDetails,
    toTitleCase,
    customerOrders,
    productImages,
    handleCancleOrder,
    orderPrices,
    expandedOrderId,
    productNames = [],
    toggleExpand,
}) {
    return (
        <Box sx={{ minHeight: '100vh', paddingBottom: '5%' }}>
            <Typography
                sx={{
                    color: 'black',
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
                }}
                paddingTop={2}
                textAlign="center"
                variant="h3"
            >
                {`${toTitleCase(customerDetails?.name?.first)} ${toTitleCase(customerDetails?.name?.last)}'s Orders`}
            </Typography>
            {customerOrders.length === 0 ? (
                <Typography
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: 'black',
                        paddingTop: 5,
                    }}
                    variant="h5"
                >
                    No Orders Yet
                </Typography>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        alignItems: 'center',
                        gap: 5,
                        marginTop: '3%',
                    }}
                >
                    {customerOrders?.map((order, index) => {
                        const totalPrice = orderPrices[order._id];

                        return (
                            <Box
                                key={index}
                                sx={{
                                    border: '1px solid',
                                    borderColor: 'black',
                                    width: '50%',
                                    borderRadius: '30px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    paddingY: '3%',
                                    gap: 3,
                                    cursor: 'pointer',
                                }}
                                onClick={() => toggleExpand(order._id)}
                            >
                                <Typography sx={{ fontWeight: 'bold', color: 'black' }} variant="h6">
                                    {new Date(order.createdAt).toLocaleDateString('en-GB')}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
                                    {order.productsAndQuantity && Array.isArray(order.productsAndQuantity) && order.productsAndQuantity.length > 0 ? (
                                        order.productsAndQuantity.map((product) => {
                                            const image = productImages[product.id];
                                            return (
                                                image && (
                                                    <ImageListItem key={`${order._id}-${product.id}`} sx={{ maxWidth: '50px' }}>
                                                        <img
                                                            src={image.url}
                                                            alt={image.alt}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: '10px',
                                                                border: '1px dotted black',
                                                            }}
                                                        />
                                                    </ImageListItem>
                                                )
                                            );
                                        })
                                    ) : (
                                        <Typography sx={{ color: 'black', fontStyle: 'italic' }}>No products available</Typography>
                                    )}
                                </Box>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 'bold',
                                        color:
                                            order.status === 'Pending'
                                                ? 'orange'
                                                : order.status === 'In Progress'
                                                    ? '#00BFFF'
                                                    : order.status === 'Completed'
                                                        ? 'green'
                                                        : 'black',
                                    }}
                                >
                                    {order.status}
                                </Typography>

                                <Collapse in={expandedOrderId === order._id}>
                                    <Box sx={{ padding: 2 }}>
                                        <Typography sx={{ textAlign: 'center', color: 'black' }} variant="body1">
                                            <strong>Products In Order</strong>
                                        </Typography>
                                        <Box>
                                            <List>
                                                {order.productsAndQuantity && Array.isArray(order.productsAndQuantity) && order.productsAndQuantity.length > 0 ? (
                                                    order.productsAndQuantity.map((product) => (
                                                        <ListItem
                                                            key={`${order._id}-${product.id}`} // Add unique key here
                                                            sx={{ color: 'black', typography: 'body1', padding: '0' }}
                                                        >
                                                            {product.quantity} x {toTitleCase(productNames[product.id]) || 'Unknown Product'}
                                                        </ListItem>
                                                    ))
                                                ) : (
                                                    <Typography sx={{ color: 'black', fontStyle: 'italic' }}>No products in this order</Typography>
                                                )}
                                            </List>
                                        </Box>
                                        <Box sx={{ textAlign: 'center', marginTop: 5 }}>
                                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
                                                Total Price
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ textAlign: 'center', color: 'black', fontSize: '20px' }} variant="body2">
                                            {totalPrice !== undefined ? `₪${totalPrice}` : 'Calculating...'}
                                        </Typography>
                                    </Box>
                                    {order.status === 'Pending' && (
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button onClick={() => handleCancleOrder(order._id)} variant="contained" sx={{ backgroundColor: 'black' }}>
                                                Cancel Order
                                            </Button>
                                        </Box>
                                    )}
                                </Collapse>
                            </Box>
                        );
                    })}
                </Box>
            )}
        </Box>
    );
}
