import React, { useEffect, useState } from 'react';
import UpdateProductComponent from '../UpdateProductComponent';
import useProducts from '../../../../products/hooks/useProducts';
import { Box, Typography, CircularProgress } from '@mui/material';
import UpdateSingleProduct from '../UpdateSingleProduct';
import useForm from '../../../../formHelpers/useForm';
import addProductSchema from '../../../../formHelpers/schemas/addProductSchema';
import initialAddProductFrom from '../../../helpers/initialAddProductFrom';
import { ClipLoader } from 'react-spinners';

export default function UpdateProductManager() {
    const { getProducts, getProductById, updateProduct, toTitleCase } = useProducts();
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
            } catch (err) {
                console.log(err);

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
        await updateProduct(productId, fixedData)

    }

    const { handleChange, error, onSubmit, isFormValid } = useForm(initialAddProductFrom, addProductSchema, handleSubmit)



    const renderContent = () => {
        switch (selectedComponent) {
            case 'products':
                return <UpdateProductComponent allProducts={allProducts} handleFetchProductId={handleFetchProductId} toTitleCase={toTitleCase} />;
            case 'update':
                return <UpdateSingleProduct handleBackButton={handleBackButton} product={singleProduct} handleChange={handleChange} error={error} onSubmit={onSubmit} isFormValid={isFormValid} />;
            default:
                return <UpdateProductComponent allProducts={allProducts} handleFetchProductId={handleFetchProductId} toTitleCase={toTitleCase} />;
        }
    };

    return (
        <>
            <Typography sx={{ textAlign: "center", py: 2, color: "black", fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" } }} variant='h3'>Update Product</Typography>
            <Box>
                {isLoading ? (

                    <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center", width: "100%", pt: 40 }}>
                        <ClipLoader size={"60px"} color="turquoise" cssOverride={{ fontWeight: "900" }} />
                    </Box>

                ) : (
                    renderContent()
                )}
            </Box>
        </>
    );
}
