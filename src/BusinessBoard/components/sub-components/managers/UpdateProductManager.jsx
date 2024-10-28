import React, { useEffect, useState } from 'react';
import UpdateProductComponent from '../UpdateProductComponent';
import useProducts from '../../../../products/hooks/useProducts';
import { Box, Typography, CircularProgress } from '@mui/material';
import UpdateSingleProduct from '../UpdateSingleProduct';

export default function UpdateProductManager() {
    const { getProducts } = useProducts();
    const [isLoading, setIsLoading] = useState(true);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedComponent, setSelectedComponent] = useState('products');
    const [productId, setProductId] = useState("")

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                setAllProducts(products);
                console.log("Fetched products:", products);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleFetchProductId = (id) => {
        setProductId(id)
        setSelectedComponent("update")
    }
    const handleBackButton = () => {
        setSelectedComponent("products")
    }


    const renderContent = () => {
        switch (selectedComponent) {
            case 'products':
                return <UpdateProductComponent allProducts={allProducts} handleFetchProductId={handleFetchProductId} />;
            case 'update':
                return <UpdateSingleProduct handleBackButton={handleBackButton} />;
            default:
                return <UpdateProductComponent allProducts={allProducts} handleFetchProductId={handleFetchProductId} />;
        }
    };

    return (
        <>
            <Typography sx={{ textAlign: "center", pt: 2, pb: 5 }} variant="h3">UPDATE PRODUCT</Typography>
            <Box>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    renderContent()
                )}
            </Box>
        </>
    );
}
