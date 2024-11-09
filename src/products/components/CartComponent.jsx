import React, { useEffect } from 'react';
import { Box, Button, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnack } from '../../providers/SnackBarProvider';
import ROUTES from '../../router/routesModel';

export default function CartComponent({ calculateTotalQuantity, calculateTotalPrice, customer, productDetails, toTitleCase, handleRemoveItemFromCart, handlePlaceOrder, cart, navigate }) {
    const setSnack = useSnack()
    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Box sx={{ width: "35%", height: "fit-content", border: "2px solid", borderColor: "black", position: "fixed", right: 20, borderRadius: "20px", backgroundColor: "#000000" }}>
                <Typography color='#FFFFFF' sx={{ textAlign: 'center', mt: 3, mb: 5, fontWeight: "bold" }} variant='h3'>YOUR CART</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, ml: 2 }}>
                    <Typography variant='h5' color='#FFFFFF'>Total Products In Cart: <span style={{ fontWeight: "bold", textDecoration: "underline" }}>{calculateTotalQuantity()}</span></Typography>
                    <Typography variant='h5' color='#FFFFFF'>Total Price: <span style={{ fontWeight: "bold", textDecoration: "underline" }}>{calculateTotalPrice()}₪</span></Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: 'center', mt: 7, mb: 5 }}>
                    <Button
                        onClick={async () => {
                            let checkOrder = await handlePlaceOrder(cart, customer)

                            if (checkOrder) {
                                setSnack(
                                    "success",
                                    <>
                                        Your order was placed successfully! You can manage it in
                                        <Typography onClick={() => navigate(ROUTES.MANAGE_MY_ORDERS)} sx={{ cursor: "pointer" }} component="span" color="purple"> Manage Orders</Typography>
                                    </>
                                );
                            }


                        }}
                        variant='contained'
                        disabled={!customer || cart.length === 0}
                        sx={{
                            opacity: cart.length === 0 ? "0.5" : "1",
                            color: "black",
                            fontSize: "1rem",
                            backgroundColor: customer ? "white" : "gray",
                            border: "1px solid white",
                            "&.Mui-disabled": {
                                backgroundColor: "gray",
                                color: "white"
                            }
                        }}
                    >
                        Order
                    </Button>
                </Box>
            </Box>
            <Grid container spacing={2} sx={{ width: "60%", my: 2, ml: 1, position: "relative" }}>
                {productDetails.length > 0 ? (
                    productDetails.map((item) => (
                        <Grid item xs={12} sx={{ border: '1px solid', borderColor: "black", width: "25%", display: 'flex', borderRadius: "20px", gap: 1, m: 2 }} key={item.id}>
                            <CardMedia
                                component="img"
                                image={item.product?.image.url}
                                sx={{
                                    objectFit: "contain",
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "20px"
                                }}
                            />
                            <Box sx={{ borderRight: "1px solid", borderColor: "black", height: "5vw", margin: "auto 5px" }}>
                            </Box>
                            <Box sx={{ marginTop: 2, marginLeft: 2 }}>
                                <Typography sx={{ color: "black" }} variant='h6'>{item.product?.price}₪</Typography>
                                <Typography sx={{ color: "black" }} variant='h6'>Quantity: {item.quantity}</Typography>
                                <Typography sx={{ color: "black", fontWeight: "600" }} variant='h5'>{toTitleCase(item.product?.name)}</Typography>
                            </Box>
                            <IconButton onClick={() => handleRemoveItemFromCart(item.id)} sx={{ position: "absolute", right: 30 }}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    ))
                ) : (
                    <Typography sx={{ color: "black" }}>Your cart is empty.</Typography>
                )
                }
            </Grid >
        </Box>

    );
}
