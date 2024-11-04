import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProducts from './useProducts';
import { useCurrentCustomer } from '../../customers/provider/UserProvider';
import useCustomers from '../../customers/hooks/useCustomers';
import useOrders from '../../orders/hooks/useOrders';
import { useSnack } from '../../providers/SnackBarProvider';
import { Typography } from '@mui/material';

export default function useCart() {
    const navigate = useNavigate();
    const { setCartInDb, getCartFromDb, getCustomerById } = useCustomers()
    const { placeNewOrder, updateOrdersInCustomer } = useOrders()
    const { updateStockAfterOrder, getProductById } = useProducts()
    const [hasOutOfStock, setHasOutOfStock] = useState(false)
    const { customer } = useCurrentCustomer()
    const setSnack = useSnack();


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
                    setSnack("info", "Item removed from cart");
                } else {
                    updatedCart[existingItemIndex].quantity = quantity;
                    setSnack("success", "Cart updated");
                }
                return updatedCart;
            } else if (quantity > 0) {
                setSnack("success", "Item added to cart");
                return [...prev, { id, quantity }];
            } else {
                return prev;
            }
        });
    };

    const handleRemoveItemFromCart = async (id) => {
        try {
            if (customer) {
                const updatedCart = cart.filter(item => item.id !== id);
                setCart(updatedCart);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                await setCartInDb(customer._id, updatedCart);
            }
        } catch (err) {
            console.log(err);

        }
    };

    const handleRemoveAllFromCart = async () => {
        try {
            if (customer) {
                const updatedCart = []
                setCart(updatedCart);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                await setCartInDb(customer._id, updatedCart);
            }
        } catch (err) {
            console.log(err);

        }

    }
    const checkStock = async (cart) => {
        const outOfStockIds = [];
        const insufficientStockUpdates = [];

        for (const product of cart) {
            try {
                let getProduct = await getProductById(product.id);

                if (getProduct.inStock === 0) {
                    setSnack("error", `${getProduct.name} is out of stock`);
                    outOfStockIds.push(product.id);
                } else if (getProduct.inStock < product.quantity) {
                    setSnack("error", `Only ${getProduct.inStock} left of ${getProduct.name}. Updating quantity in cart.`);
                    insufficientStockUpdates.push({
                        id: product.id,
                        newQuantity: getProduct.inStock
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }

        const updatedCart = cart.filter(item => !outOfStockIds.includes(item.id))
            .map(item => {
                const update = insufficientStockUpdates.find(update => update.id === item.id);
                if (update) {
                    return { ...item, quantity: update.newQuantity };
                }
                return item;
            });

        setCart(updatedCart);
        if (customer) {
            await setCartInDb(customer._id, updatedCart);
        }

        return outOfStockIds.length > 0 || insufficientStockUpdates.length > 0;
    };

    const handlePlaceOrder = async () => {
        const isStockIssue = await checkStock(cart);

        if (isStockIssue) {
            return;
        }

        const orderProducts = cart.map(item => ({
            id: item.id,
            quantity: item.quantity
        }));

        try {
            const customerDetails = await getCustomerById(customer._id);
            if (orderProducts.length > 0) {

                const orderDetails = {
                    customer_id: customerDetails._id,
                    phone: customerDetails.phone,
                    address: customerDetails.address,
                    productsAndQuantity: orderProducts
                };
                const { _id: orderId } = await placeNewOrder(orderDetails);
                await updateOrdersInCustomer(customer._id, orderId);
                await updateStockAfterOrder(cart);
                await handleRemoveAllFromCart();
            } else {
                setSnack("error", "Nothing in cart")
            }

        } catch (err) {
            console.log(err);
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
        setCart,
        handlePlaceOrder
    };
}
