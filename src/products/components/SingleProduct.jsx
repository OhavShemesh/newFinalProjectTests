import React from 'react';
import { Box, Button, CardMedia, Typography } from '@mui/material';

export default function SingleProduct({
    singleProduct,
    toTitleCase,
    quantity,
    handleIncrement,
    handleDecrement,
    handleAddToCart,
    customer,
    setSnack
}) {

    return (
        <Box sx={{ display: "flex", pt: 3, minHeight: "100vh", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "center", sm: "flex-start" } }}>
            <Box sx={{ width: "40%", ml: 2 }}>
                <CardMedia
                    sx={{ objectFit: "scale-down", borderRadius: "20px" }}
                    component="img"
                    image={singleProduct?.image.url}
                />
            </Box>
            <Box sx={{ mt: 2, ml: 2, display: 'flex', flexDirection: "column", gap: 2 }}>
                <Typography variant='h3' sx={{ fontWeight: "bold", color: "black" }}>
                    {toTitleCase(singleProduct?.name)}
                </Typography>
                <Typography variant='h6' sx={{ color: "black" }}>{singleProduct?.description}</Typography>
                <Typography variant='h5' sx={{ fontWeight: "bold", color: "black" }}>
                    Price: {singleProduct?.price}₪
                </Typography>
                <Box sx={{
                    display: 'flex', border: "1px solid black", width: "fit-content", alignItems: "center",
                    borderRadius: "20px", backgroundColor: "black"
                }}>
                    <Button onClick={handleIncrement} sx={{ color: "white", fontSize: "20px" }}>+</Button>
                    <Typography sx={{ color: "white" }}>{quantity}</Typography>
                    <Button onClick={handleDecrement} sx={{ color: "white", fontSize: "20px", letterSpacing: "-3px" }}>--</Button>
                </Box>
                <Typography variant='h6' sx={{ fontWeight: "bold", color: "black" }}>
                    In Stock: <Typography sx={{ fontSize: "smaller", color: singleProduct?.inStock === 0 ? "red" : "auto" }} variant='span'>
                        {singleProduct?.inStock === 0 ? "Out Of Stock" : singleProduct?.inStock}
                    </Typography>
                </Typography>
                <Box sx={{ marginTop: "auto", marginBottom: 3 }}>
                    <Button onClick={() => customer ? handleAddToCart(singleProduct?._id, quantity) : setSnack("error", "Please Login")}
                        sx={{
                            color: 'white',
                            backgroundColor: customer ? "black" : "grey",
                            borderRadius: "20px",
                            width: { xs: "90%", sm: "100%" },
                            opacity: singleProduct?.inStock === 0 ? "0.6" : "1" || customer ? 1 : 0.6,
                            pointerEvents: singleProduct?.inStock === 0 ? "none" : "auto"
                        }}>
                        Add To Cart
                    </Button>
                </Box>
            </Box>
        </Box>

    );
}
