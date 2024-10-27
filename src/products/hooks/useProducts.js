import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentCustomer } from '../../customers/provider/UserProvider';

export default function useProducts() {
    const [allProducts, setAllProducts] = useState([]);
    const [singleProduct, setSingleProduct] = useState({});
    const [chosenCategory, setChosenCategory] = useState("")
    const navigate = useNavigate()
    const { customer } = useCurrentCustomer()



    const ProductsApi = "http://localhost:8181/products";
    const CustomersApi = "http://localhost:8181/customers";


    const getProducts = async () => {
        try {
            const response = await axios.get(ProductsApi);
            setAllProducts(response.data);
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



    useEffect(() => {
        getProducts();
    }, []);

    const handleFilterByCategory = (innerText) => {
        console.log(innerText);

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
        
    };
}
