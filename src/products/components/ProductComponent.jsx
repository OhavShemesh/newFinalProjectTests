import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from "react";
import { useCurrentCustomer } from "../../customers/provider/UserProvider";
import { useLocation } from "react-router-dom";
import { useSnack } from "../../providers/SnackBarProvider";

export default function ProductComponent({ allProducts = [], handleAddToCart, cart, navigate, category, toTitleCase }) {
    const [quantities, setQuantities] = useState({});
    const { customer } = useCurrentCustomer();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get("searchValue") || "";
    const setSnack = useSnack()

    useEffect(() => {
        const initialQuantities = allProducts.reduce((acc, product) => {
            const cartItem = cart?.find(item => item.id === product._id);
            acc[product._id] = cartItem ? cartItem.quantity : 0;
            return acc;
        }, {});

        setQuantities(initialQuantities);
    }, [allProducts, cart]);

    const handleIncrement = (productId) => {
        const product = allProducts.find(product => product._id === productId);
        const currentQuantity = quantities[productId] || 0;

        if (currentQuantity < product.inStock) {
            setQuantities(prev => ({
                ...prev,
                [productId]: prev[productId] + 1,
            }));
        }
    };

    const handleDecrement = (productId) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: Math.max(0, prev[productId] - 1),
        }));
    };

    const filteredProducts = allProducts.filter(product => {
        const matchesCategory = !category || product.category === category;
        const matchesSearchValue = product.name.toLowerCase().includes(searchValue.toLowerCase());
        return matchesCategory && matchesSearchValue;
    });

    return (
        <Grid container spacing={2} py={3} justifyContent="center" sx={{ maxWidth: '80vw', margin: '0 auto' }}>
            {filteredProducts.map(product => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={product._id} mb={10}>
                    <Card sx={{ maxWidth: "100%", height: 450, borderRadius: "20px", border: "1px solid", borderColor: "black", opacity: product?.inStock === 0 ? "0.5" : "1", position: "relative" }}>
                        <CardActionArea sx={{ height: "70%" }} onClick={() => navigate("/product-info/" + product._id)}>
                            <CardHeader
                                sx={{ textAlign: "center", fontWeight: "bold", height: "20%" }}
                                title={toTitleCase(product.name)}
                                subheader={product.description}
                            />
                            <CardMedia
                                sx={{ objectFit: "scale-down", height: "50%", width: "100%" }}
                                component="img"
                                height="150"
                                image={product.image.url}
                                alt={product.image.alt}
                            />
                            <CardContent>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Price: &#8362; {product.price} <br />
                                    In Stock:{" "}
                                    <span style={{ color: product.inStock ? "inherit" : "red", fontWeight: product.inStock ? "normal" : "bold" }}>
                                        {product.inStock || "Out Of Stock"}
                                    </span>
                                    <br />
                                    Category: {product.category}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <Box sx={{ display: "flex", justifyContent: "space-between", height: "20%", alignItems: "flex-end" }}>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                            </CardActions>
                            <Box sx={{
                                display: 'flex', border: "1px solid grey", alignItems: "center",
                                borderRadius: "15px", width: "35%", justifyContent: 'center', marginRight: 1, marginBottom: 1,
                                pointerEvents: product?.inStock === 0 ? "none" : "auto"
                            }}>
                                <Button onClick={() => handleIncrement(product._id)} sx={{ color: "grey", fontSize: "16px", marginRight: -1 }}>+</Button>
                                <Typography color="grey">{product?.inStock === 0 ? "0" : quantities[product._id] || 0}</Typography>
                                <Button onClick={() => handleDecrement(product._id)} sx={{ color: "grey", fontSize: "16px", letterSpacing: "-3px", marginLeft: -1 }}>--</Button>
                            </Box>
                        </Box>
                        <Button
                            onClick={() => customer ? handleAddToCart(product._id, quantities[product._id]) : setSnack("error", "Please LogIn")}
                            sx={{
                                backgroundColor: customer ? "black" : "grey",
                                height: "10%",
                                width: "100%",
                                display: 'flex',
                                justifyContent: "center",
                                color: "white",
                                opacity: customer ? 1 : 0.6,
                                borderRadius: "0"
                            }}
                        >
                            Add To Cart
                        </Button>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
