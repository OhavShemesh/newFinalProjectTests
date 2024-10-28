import React, { useEffect, useState } from 'react';
import { getFromLocalStorage } from '../../localStorageFunctions/useLocalStorage';
import { Box, Button, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import useProducts from '../hooks/useProducts';
import DeleteIcon from '@mui/icons-material/Delete';
import useCart from '../hooks/useCart';
import { useCurrentCustomer } from '../../customers/provider/UserProvider';

export default function CartComponent() {
    const { getProductById, toTitleCase } = useProducts();
    const [productDetails, setProductDetails] = useState([]);
    const { handleRemoveItemFromCart, cart, setCart } = useCart()
    const { customer } = useCurrentCustomer()

    useEffect(() => {
        if (customer) {

        } else {
            const cartFromLocalStorage = JSON.parse(getFromLocalStorage("cart")) || [];
            setCart(cartFromLocalStorage);

        }

    }, []);



    useEffect(() => {
        const fetchProductDetails = async () => {
            const details = await Promise.all(
                cart.map(async (item) => {
                    try {
                        const product = await getProductById(item.id);
                        return { ...item, product };
                    } catch (err) {
                        console.error(`Error fetching product with ID ${item.id}:`, err);
                        return item;
                    }
                })
            );
            setProductDetails(details);
        };

        if (cart.length > 0) {
            fetchProductDetails();
        } else {
            setProductDetails([]);
        }
    }, [cart]);
    const calculateTotalPrice = () => {
        const total = productDetails.reduce((sum, item) => {
            const productPrice = item.product?.price || 0;
            const productTotal = productPrice * item.quantity;
            return sum + productTotal;
        }, 0);

        return total.toFixed(2);
    };
    const calculateTotalQuantity = () => {
        return productDetails.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    };
    return (
        <Box >
            <Box sx={{ width: "35%", height: "fit-content", border: "1px solid black", position: "fixed", right: 20, borderRadius: "20px", backgroundColor: "black" }}>
                <Typography color='white' sx={{ textAlign: 'center', mt: 3, mb: 5, fontWeight: "bold" }} variant='h3'>YOUR CART</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, ml: 2 }}>
                    <Typography variant='h5' color='white'>Total Products In Cart: {calculateTotalQuantity()}</Typography>
                    <Typography variant='h5' color='white' sx={{ fontWeight: "bolder" }}>Total Price: {calculateTotalPrice()}₪</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: 'center', mt: 7, mb: 5 }}>
                    <Button
                        variant='contained'
                        disabled={!customer}
                        sx={{
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
                        <Grid item xs={12} sx={{ border: '1px solid black', width: "25%", display: 'flex', borderRadius: "20px", gap: 1, m: 2 }} key={item.id}>
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
                            <Box sx={{ borderRight: "1px solid black", height: "5vw", margin: "auto 5px" }}>
                            </Box>
                            <Box sx={{ marginTop: 2, marginLeft: 2 }}>
                                <Typography variant='h5' sx={{ fontWeight: "600" }}>{toTitleCase(item.product?.name)}</Typography>
                                <Typography variant='h6'>{item.product?.price}₪</Typography>
                                <Typography variant='h6'>Quantity: {item.quantity}</Typography>
                            </Box>
                            <IconButton onClick={() => handleRemoveItemFromCart(item.id)} sx={{ position: "absolute", right: 30 }}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    ))
                ) : (
                    <Typography>Your cart is empty.</Typography>
                )
                }
            </Grid >
        </Box>

    );
}
