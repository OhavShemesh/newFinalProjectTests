import React, { useEffect, useState } from 'react';
import UpdateProductComponent from '../UpdateProductComponent';
import useProducts from '../../../../products/hooks/useProducts';
import { Box, Typography, CircularProgress } from '@mui/material';
import UpdateSingleProduct from '../UpdateSingleProduct';
import useForm from '../../../../formHelpers/useForm';
import addProductSchema from '../../../../formHelpers/schemas/addProductSchema';
import initialAddProductFrom from '../../../helpers/initialAddProductFrom';

export default function UpdateProductManager() {
    const { getProducts, getProductById, updateProduct } = useProducts();
    const [isLoading, setIsLoading] = useState(true);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedComponent, setSelectedComponent] = useState('products');
    const [productId, setProductId] = useState("")
    const [singleProduct, setSingleProduct] = useState({})

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

    useEffect(() => {
        const fetchSingleProduct = async () => {
            try {
                let singleProduct = await getProductById(productId)
                setSingleProduct(singleProduct)
                console.log("singleProduct", singleProduct);

            } catch (err) {
                console.log(err);

            }
        }
        fetchSingleProduct()
    }, [productId])

    const handleFetchProductId = (id) => {
        setProductId(id)
        setSelectedComponent("update")
    }
    const handleBackButton = () => {
        setSelectedComponent("products")
    }
    const handleSubmit = async (data) => {
        const fixedData = {
            ...data,
            image: {
                alt: data.alt,
                url: data.url,
            },
        };
        let product = await updateProduct(productId, fixedData)
        console.log(product);

    }

    const { handleChange, error, onSubmit, isFormValid } = useForm(initialAddProductFrom, addProductSchema, handleSubmit)



    const renderContent = () => {
        switch (selectedComponent) {
            case 'products':
                return <UpdateProductComponent allProducts={allProducts} handleFetchProductId={handleFetchProductId} />;
            case 'update':
                return <UpdateSingleProduct handleBackButton={handleBackButton} product={singleProduct} handleChange={handleChange} error={error} onSubmit={onSubmit} isFormValid={isFormValid} />;
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
