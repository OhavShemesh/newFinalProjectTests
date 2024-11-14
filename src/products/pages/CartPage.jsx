import React, { useEffect, useState } from 'react'
import CartComponent from '../components/CartComponent'
import CartCheckCustomer from '../helpers/CartCheckCustomer'
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';
import { useCurrentCustomer } from '../../customers/provider/UserProvider';


export default function CartPage() {
    const { getProductById, toTitleCase, navigate } = useProducts();
    const [productDetails, setProductDetails] = useState([]);
    const { handleRemoveItemFromCart, cart, handlePlaceOrder } = useCart()
    const { customer } = useCurrentCustomer()


    useEffect(() => {
        const fetchProductDetails = async () => {
            const details = await Promise.all(
                cart.map(async (item) => {
                    try {
                        const product = await getProductById(item.id);
                        return { ...item, product };
                    } catch (err) {
                        console.log(err);
                        return item;
                    }
                })
            );
            setProductDetails(details);
        };

        if (cart?.length > 0) {
            fetchProductDetails();
        } else {
            setProductDetails([]);
        }
    }, [cart]);
    const calculateTotalPrice = () => {
        const total = productDetails.reduce((sum, item) => {
            const productPrice = item.product?.price || 0;
            const productTotal = productPrice * item.quantity;
            return sum + productTotal;
        }, 0);

        return total.toFixed(2);
    };

    const calculateTotalQuantity = () => {
        return productDetails.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    };


    return (
        <>
            <CartComponent calculateTotalPrice={calculateTotalPrice} calculateTotalQuantity={calculateTotalQuantity} customer={customer} productDetails={productDetails} toTitleCase={toTitleCase} handleRemoveItemFromCart={handleRemoveItemFromCart} handlePlaceOrder={handlePlaceOrder} cart={cart} navigate={navigate} />
        </>
    )
}
