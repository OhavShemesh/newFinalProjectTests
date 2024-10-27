import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProducts from './useProducts';
import { useCurrentCustomer } from '../../customers/provider/UserProvider';
import useCustomers from '../../customers/hooks/useCustomers';

export default function useCart() {
    const navigate = useNavigate();
    const { setCartInDb, getCartFromDb } = useCustomers()
    const { customer } = useCurrentCustomer()


    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (customer) {
                    let cartFromDb = await getCartFromDb(customer._id);
                    setCart(cartFromDb);
                } else {
                    const savedCart = localStorage.getItem("cart");
                    setCart(savedCart ? JSON.parse(savedCart) : []);
                }
            } catch (error) {
                setCart([]);
            }
        };

        fetchCart();
    }, [customer]);

    const handleAddToCart = async (id, quantity) => {
        setCart(prev => {
            const existingItemIndex = prev.findIndex(item => item.id === id);

            if (existingItemIndex !== -1) {
                const updatedCart = [...prev];
                if (quantity === 0) {
                    updatedCart.splice(existingItemIndex, 1);
                } else {
                    updatedCart[existingItemIndex].quantity = quantity;
                }
                return updatedCart;
            } else if (quantity > 0) {
                return [...prev, { id, quantity }];
            } else {
                return prev;
            }
        });
    };
    const handleRemoveItemFromCart = async (id) => {
        console.log("Current cart before removal:", cart);

        const updatedCart = cart.filter(item => item.id !== id);

        console.log("Updated cart after removal:", updatedCart);

        setCart(updatedCart);

        localStorage.setItem("cart", JSON.stringify(updatedCart));

        try {
            if (customer) {
                await setCartInDb(customer._id, updatedCart);
                console.log("Cart updated in database.");
            }
        } catch (error) {
            console.error("Error updating cart in database:", error);
        }
    };


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    useEffect(() => {
        const syncCartToDb = async () => {
            if (customer && cart?.length > 0) {
                await setCartInDb(customer._id, cart);
            }
        };
        syncCartToDb();
    }, [cart]);


    return {
        handleAddToCart,
        cart,
        navigate,
        handleRemoveItemFromCart,
        setCart
    };
}
