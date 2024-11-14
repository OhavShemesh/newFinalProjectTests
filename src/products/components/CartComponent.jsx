import React, { useEffect } from 'react';
import { Box, Button, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnack } from '../../providers/SnackBarProvider';
import ROUTES from '../../router/routesModel';

export default function CartComponent({ calculateTotalQuantity, calculateTotalPrice, customer, productDetails, toTitleCase, handleRemoveItemFromCart, handlePlaceOrder, cart, navigate }) {
    const setSnack = useSnack()
    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Box sx={{ width: "35%", height: "fit-content", border: "2px solid", borderColor: "black", position: "fixed", right: { xs: 0, md: 20 }, borderRadius: "20px", backgroundColor: "#000000" }}>
                <Typography color='#FFFFFF' sx={{ textAlign: 'center', mt: 3, mb: 5, fontWeight: "bold", fontSize: { xs: "1.5rem", md: "2.5rem" } }} variant='h3'>YOUR CART</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, ml: 2 }}>
                    <Typography variant='h5' color='#FFFFFF' sx={{ fontSize: { xs: "0.7rem", md: "1rem" } }}>Total Products In Cart: <span style={{ fontWeight: "bold", textDecoration: "underline" }}>{calculateTotalQuantity()}</span></Typography>
                    <Typography sx={{ fontSize: { xs: "0.7rem", md: "1rem" } }} variant='h5' color='#FFFFFF'>Total Price: <span style={{ fontWeight: "bold", textDecoration: "underline" }}>{calculateTotalPrice()}₪</span></Typography>
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
                        sx={{
                            opacity: cart?.length === 0 ? "0.5" : "1",
                            color: "black",
                            fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
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
            <Grid container spacing={2} sx={{ width: { xs: '50%', sm: "50%", md: "60%" }, my: 2, ml: 1, position: "relative" }}>
                {productDetails.length > 0 ? (
                    productDetails.map((item) => (
                        <Grid item xs={12} sx={{ border: '1px solid', borderColor: "black", display: 'flex', flexDirection: { xs: "column", sm: "column", md: "row" }, borderRadius: "20px", gap: 1, m: { xs: 1, md: 2 }, pb: { xs: 2, sm: 2, md: 0 }, alignItems: { xs: "flex-start", sm: "center" }, position: 'relative' }} key={item.id}>
                            <CardMedia
                                component="img"
                                image={item.product?.image.url}
                                sx={{
                                    objectFit: "contain",
                                    width: { xs: "100px", md: "150px" },
                                    height: { xs: "100px", md: "150px" },
                                    borderRadius: "20px"
                                }}
                            />
                            <Box
                                sx={{
                                    borderRight: { xs: "none", sm: "none", md: "1px solid", borderColor: "black" },
                                    borderTop: { xs: "1px solid", sm: "1px solid", md: "none", borderColor: "black" },
                                    width: { xs: "50%", sm: "50%", md: 'auto' },
                                    height: { xs: "1vw", sm: "1vw", md: "5vw" },
                                    margin: "auto 5px",
                                    color:"black"
                                }}
                            >
                            </Box>
                            <Box sx={{ marginTop: { xs: 0, md: 2 }, marginLeft: 2 }}>
                                <Typography sx={{ color: "black", fontWeight: "600", fontSize: { xs: "0.8rem", sm: "1rem" } }} variant='h5'>{toTitleCase(item.product?.name)}</Typography>
                                <Typography sx={{ color: "black", fontSize: { xs: "0.8rem", sm: "1rem" } }} variant='h6'>{item.product?.price}₪</Typography>
                                <Typography sx={{ color: "black", fontSize: { xs: "0.8rem", sm: "1rem" } }} variant='h6'>Quantity: {item.quantity}</Typography>
                            </Box>
                            <IconButton onClick={() => handleRemoveItemFromCart(item.id)} sx={{ position: "absolute", right: 5, top: 5 }}>
                                <DeleteIcon sx={{ fontSize: { xs: "18px", sm: "18px", md: "24px" } }} />
                            </IconButton>
                        </Grid>
                    ))
                ) : (
                    <Typography sx={{ color: "black" }}>Your cart is empty.</Typography>
                )
                }
            </Grid >
        </Box >

    );
}
