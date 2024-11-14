import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCurrentCustomer } from '../customers/provider/UserProvider';
import useCustomers from '../customers/hooks/useCustomers';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { customer } = useCurrentCustomer();
    const { getCartFromDb } = useCustomers();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (customer) {
                    let cartFromDb = await getCartFromDb(customer?._id);
                    setCart(cartFromDb);
                }
            } catch (error) {
                setCart([]);
            }
        };

        fetchCart();
    }, [customer]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 