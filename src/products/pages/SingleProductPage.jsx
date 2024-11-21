import React, { useState, useEffect } from 'react';
import SingleProduct from '../components/SingleProduct';
import { useSnack } from '../../providers/SnackBarProvider';
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';
import { useParams } from 'react-router-dom';
import useCustomers from '../../customers/hooks/useCustomers';
import { useCurrentCustomer } from '../../customers/provider/UserProvider';

export default function SingleProductPage() {
    const { getProductById, toTitleCase } = useProducts();
    const { handleAddToCart } = useCart();
    const { id } = useParams();
    const [singleProduct, setSingleProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const { getCustomerById } = useCustomers();
    const { customer } = useCurrentCustomer();
    const setSnack = useSnack();


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProductById(id);
                setSingleProduct(product);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);


    useEffect(() => {
        const fetchQuantityOfProduct = async () => {
            if (customer && singleProduct) {
                try {
                    const customerData = await getCustomerById(customer._id);
                    const cartItem = customerData.cart.find(item => item.id === singleProduct._id);

                    if (cartItem) {
                        setQuantity(cartItem.quantity);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        };

        fetchQuantityOfProduct();
    }, [customer, singleProduct]);

    const handleIncrement = () => {
        if (quantity < singleProduct?.inStock) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(prev => prev - 1);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!singleProduct) {
        return <div>Product not found.</div>;
    }

    return (
        <SingleProduct
            singleProduct={singleProduct}
            toTitleCase={toTitleCase}
            quantity={quantity}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            handleAddToCart={handleAddToCart}
            customer={customer}
            setSnack={setSnack}
        />
    );
}
