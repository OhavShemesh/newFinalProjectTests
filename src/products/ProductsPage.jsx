import React, { useEffect, useState } from 'react'
import ProductComponent from './components/ProductComponent';
import useProducts from './hooks/useProducts';
import ProductsFilter from './helpers/ProductsFilter';
import useCart from './hooks/useCart';
import { useCurrentCustomer } from '../customers/provider/UserProvider';
import useCustomers from '../customers/hooks/useCustomers';
import { Typography } from '@mui/material';
import { useSnack } from '../providers/SnackBarProvider';

export default function ProductsPage() {
    const { allProducts, navigate, toTitleCase } = useProducts();
    const [category, setCategory] = useState("");
    const { handleAddToCart, isAddedMap, cart } = useCart()
    const { likeProducts, getCustomerById } = useCustomers()
    const { customer } = useCurrentCustomer()
    const [customerDetails, setCustomerDetails] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const setSnack = useSnack()

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

    if (!customerDetails) {
        return <Typography>Loading Customer...</Typography>
    }
    if (isLoading) {
        return <Typography>Loading...</Typography>
    }


    return (
        <>
            <ProductsFilter setCategory={setCategory} />
            <ProductComponent
                allProducts={allProducts}
                handleAddToCart={handleAddToCart}
                isAddedMap={isAddedMap}
                navigate={navigate}
                category={category}
                cart={cart}
                toTitleCase={toTitleCase}
                handleLikeProduct={handleLikeProduct}
                customerDetails={customerDetails}
                handleShare={handleShare} />
        </>
    )
}
