import React, { useEffect, useState } from 'react'
import ProductComponent from './components/ProductComponent';
import useProducts from './hooks/useProducts';
import ProductsFilter from './helpers/ProductsFilter';
import useCart from './hooks/useCart';
import { useCurrentCustomer } from '../customers/provider/UserProvider';
import useCustomers from '../customers/hooks/useCustomers';
import { Box, Typography } from '@mui/material';
import { useSnack } from '../providers/SnackBarProvider';
import ROUTES from '../router/routesModel';
import { useLocation } from 'react-router-dom';
import SetDisplay from './helpers/SetDisplay';
import ProductComponentTable from './components/ProductComponentTable';
import { ClipLoader } from 'react-spinners';

export default function ProductsPage() {
    const { allProducts, navigate, toTitleCase } = useProducts();
    const [category, setCategory] = useState("");
    const { handleAddToCart, isAddedMap, cart } = useCart()
    const { likeProducts, getCustomerById } = useCustomers()
    const { customer } = useCurrentCustomer()
    const [customerDetails, setCustomerDetails] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const setSnack = useSnack()
    const [quantities, setQuantities] = useState({});
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get("searchValue") || "";
    const [display, setDisplay] = useState("cards")


    useEffect(() => {
        const fetchCustomerDetails = async () => {
            setIsLoading(true)
            try {
                const customerData = await getCustomerById(customer?._id);
                setCustomerDetails(customerData);
            } catch (err) {
                console.log(err);

            } finally {
                setIsLoading(false)
            }
        };

        if (customer?._id) {
            fetchCustomerDetails();
        }
    }, [customer?._id]);


    const handleLikeProduct = async (productId) => {
        try {
            if (customer) {
                let customerAfterLike = await likeProducts(productId, customer?._id)
                setCustomerDetails(customerAfterLike);

            }
        } catch (err) {
            console.log(err);

        }
    }

    const handleShare = (productId) => {
        navigator.clipboard.writeText(`http://localhost:5173/product-info/${productId}`)
            .then(() => {
                setSnack("success", "Link Copied To Clipboard")
            })
            .catch(() => {
                setSnack("error", "Link Failed To Copy")
            });
    };


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

    const handleQuantityChange = (event, productId, inStock) => {
        let { value } = event.target;

        value = Math.max(0, Math.min(inStock, Number(value) || 0));

        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: value,
        }));
    };

    const filteredProducts = allProducts.filter(product => {
        const matchesCategory = !category || product.category === category;
        const matchesSearchValue = product.name.toLowerCase().includes(searchValue.toLowerCase());
        return matchesCategory && matchesSearchValue;
    });

    if (allProducts.length === 0) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center", width: "100%", pt: 40 }}>
                <ClipLoader size={"60px"} color="turquoise" cssOverride={{ fontWeight: "900" }} />
            </Box>
        )

    }

    if (isLoading) {
        return <ClipLoader />
    }


    return (
        <Box sx={{ height: "100%", backgroundColor: "white" }}>
            <ProductsFilter setCategory={setCategory} />
            <SetDisplay setDisplay={setDisplay} display={display} />
            {display === "cards" && (<ProductComponent
                allProducts={allProducts}
                handleAddToCart={handleAddToCart}
                isAddedMap={isAddedMap}
                navigate={navigate}
                category={category}
                cart={cart}
                toTitleCase={toTitleCase}
                handleLikeProduct={handleLikeProduct}
                customerDetails={customerDetails}
                handleShare={handleShare}
                filteredProducts={filteredProducts}
                customer={customer}
                quantities={quantities}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
            />)}
            {display === "table" && (
                <ProductComponentTable
                    allProducts={allProducts}
                    handleAddToCart={handleAddToCart}
                    isAddedMap={isAddedMap}
                    navigate={navigate}
                    category={category}
                    cart={cart}
                    toTitleCase={toTitleCase}
                    handleLikeProduct={handleLikeProduct}
                    customerDetails={customerDetails}
                    handleShare={handleShare}
                    filteredProducts={filteredProducts}
                    customer={customer}
                    quantities={quantities}
                    handleDecrement={handleDecrement}
                    handleIncrement={handleIncrement}
                    handleQuantityChange={handleQuantityChange}
                />
            )}
        </Box>
    )
}
