import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function DeleteProductsComponent({ handleDelete, products }) {
    const [displayedProducts, setDisplayedProducts] = useState(products);
    const [checkSureMap, setCheckSureMap] = useState({});

    useEffect(() => {
        setDisplayedProducts(products);
    }, [products]);

    const handleCheckSure = (productId, value) => {
        setCheckSureMap(prev => ({ ...prev, [productId]: value }));
    };

    const handleDeleteProduct = (productId) => {
        handleDelete(productId);
        setDisplayedProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        setCheckSureMap(prev => ({ ...prev, [productId]: false }));
    };

    return (
        <Box sx={{ pb: 5, width: "80%", margin: "auto" }}>
            <Typography sx={{ textAlign: "center", pt: 2, pb: 5 }} variant="h3">DELETE PRODUCTS</Typography>
            <Grid container spacing={3} px={3} justifyContent="center">
                {displayedProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={product._id}>
                        <Card sx={{
                            borderRadius: "40px",
                            width: "100%",
                            backgroundColor: 'white',
                            border: "1px solid black",
                        }}>
                            <CardContent sx={{ textAlign: "center", fontWeight: "bold", fontSize: "24px", height: "50px" }}>
                                {product?.name}
                            </CardContent>
                            <CardMedia
                                component="img"
                                image={product.image.url}
                                alt={product.image.alt}
                                sx={{ height: 250, objectFit: "fill" }}
                            />
                            {!checkSureMap[product._id] ? (
                                <IconButton
                                    onClick={() => handleCheckSure(product._id, true)}
                                    sx={{ display: 'flex', justifyContent: "center", alignItems: "center", width: "100%" }}
                                >
                                    <DeleteOutlineIcon color='error' />
                                    <Typography color='error'>Delete Product</Typography>
                                </IconButton>
                            ) : (
                                <Box sx={{ display: 'flex', justifyContent: 'center', width: "100%" }}>
                                    <Button
                                        onClick={() => handleCheckSure(product._id, false)}
                                        sx={{ width: "50%", opacity: "0.9" }}
                                        color='success'
                                        variant='contained'
                                    >
                                        Reject
                                    </Button>
                                    <Button
                                        sx={{ width: "50%", opacity: "0.9" }}
                                        color='error'
                                        variant='contained'
                                        onClick={() => handleDeleteProduct(product._id)}
                                    >
                                        Confirm
                                    </Button>
                                </Box>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
