import React, { useEffect, useState } from 'react';
import UpdateStockComponent from '../UpdateStockComponent';
import useProducts from '../../../../products/hooks/useProducts';
import { Typography } from '@mui/material';

export default function UpdateStockManager() {
    const { getProducts, updateInStock, getProductById } = useProducts();
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
            const product = await updateInStock(productId, Math.max(0, newStock));
            console.log(product);
            setEditProductId(null);
            setNewStock('');
            setSomethingChanged(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddToStock = async (productId) => {
        try {
            console.log(productId);
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
        console.log("newStock", newStock);
    }, [newStock]);

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
        />
    );
}
