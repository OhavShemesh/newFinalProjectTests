import React, { useEffect, useState } from 'react';
import UpdateStockComponent from '../UpdateStockComponent';
import useProducts from '../../../../products/hooks/useProducts';
import { Typography } from '@mui/material';

export default function UpdateStockManager() {
    const { getProducts, updateInStock, getProductById, toTitleCase } = useProducts();
    const [allProducts, setAllProducts] = useState([]);
    const [editProductId, setEditProductId] = useState(null);
    const [editAddProductId, setEditAddProductId] = useState(null);
    const [newStock, setNewStock] = useState('');
    const [addStock, setAddStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [somethingChanged, setSomethingChanged] = useState(false);

    const handleEditClick = (product) => {
        setEditProductId(product._id);
        setNewStock(Math.max(0, product.inStock));
    };

    const handleEditAddClick = (product) => {
        setEditAddProductId(product._id);
        setAddStock(0);
    };

    const handleChangeInStock = async (productId) => {
        try {
            await updateInStock(productId, Math.max(0, newStock));
            setEditProductId(null);
            setNewStock('');
            setSomethingChanged(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddToStock = async (productId) => {
        try {
            let product = await getProductById(productId);
            const updateStock = Math.max(0, +product.inStock + +addStock);
            await updateInStock(productId, updateStock);
            setEditAddProductId(null);
            setAddStock(0);
            setSomethingChanged(true);
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                setAllProducts(products);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
                setSomethingChanged(false);
            }
        };
        fetchProducts();
    }, [somethingChanged]);

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <Typography sx={{ textAlign: "center", py: 2, color: "black", fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" } }} variant='h3'>Manage Stock</Typography>
            <UpdateStockComponent
                products={allProducts}
                editProductId={editProductId}
                handleEditClick={handleEditClick}
                newStock={newStock}
                setNewStock={(value) => setNewStock(Math.max(0, value))}
                handleSave={handleChangeInStock}
                addStock={addStock}
                setAddStock={(value) => setAddStock(Math.max(0, value))}
                handleEditAddClick={handleEditAddClick}
                editAddProductId={editAddProductId}
                handleAddToStock={handleAddToStock}
                toTitleCase={toTitleCase}
            />
        </>
    );
}
