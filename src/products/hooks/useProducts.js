import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useProducts() {
    const [allProducts, setAllProducts] = useState([]);
    const [singleProduct, setSingleProduct] = useState({});
    const [chosenCategory, setChosenCategory] = useState("")
    const navigate = useNavigate()

    const ProductsApi =
        window.location.hostname === "localhost"
            ? "http://localhost:8181/products"
            : "https://newback-ye1s.onrender.com/products";

    useEffect(() => {
        console.log(ProductsApi);

    }, [])


    const getProducts = async () => {
        try {
            const response = await axios.get(ProductsApi);
            const data = response.data
            setAllProducts(data);
            return data
        } catch (err) {
            console.log(err);

        }
    };

    const getProductById = async (id) => {
        try {
            const response = await axios.get(`${ProductsApi}/${id}`);
            const data = response.data;
            setSingleProduct(data)
            return data

        } catch (err) {
            console.log(err);
        }
    };
    const addProduct = async (newProductDetails) => {
        try {
            const response = await axios.post(ProductsApi, newProductDetails)
            const data = response.data
            return data
        } catch (err) {
            console.log(err);

        }
    }
    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`${ProductsApi}/${id}`)
            const data = response.data
            return data
        } catch (err) {
            console.log(err);

        }
    }
    const updateProduct = async (id, updatedProductDetails) => {
        try {
            const response = await axios.put(`${ProductsApi}/${id}`, updatedProductDetails)
            const data = response.data
            return data
        } catch (err) {
            console.log(err);

        }
    }
    const updateInStock = async (id, newStock) => {
        try {

            const response = await axios.patch(`${ProductsApi}/updateInStock`, { id: id, newStock: newStock })
            const data = response.data
            return data
        } catch (err) {
            console.log(err);

        }
    }
    const updateStockAfterOrder = async (cart) => {
        try {
            cart.map(async (product) => {
                const response = await axios.patch(`${ProductsApi}/updateStockAfterOrder`, {
                    id: product.id,
                    subFromStock: product.quantity
                });
                const data = response.data
                return data

            });

        } catch (err) {
            console.log(err);

        }
    };



    useEffect(() => {
        getProducts();
    }, []);

    const handleFilterByCategory = (innerText) => {

        if (innerText !== "all") {
            setChosenCategory(innerText);
        } else {
            setChosenCategory("");
        }

    }

    function toTitleCase(str) {
        if (typeof str !== 'string' || str.trim() === '') {
            return '';
        }

        return str.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }



    return {
        allProducts,
        getProductById,
        singleProduct,
        setSingleProduct,
        handleFilterByCategory,
        navigate,
        toTitleCase,
        addProduct,
        deleteProduct,
        getProducts,
        updateProduct,
        updateInStock,
        updateStockAfterOrder

    };
}
