import { useNavigate } from 'react-router-dom';
import useProducts from './useProducts';
import { useCurrentCustomer } from '../../customers/provider/UserProvider';
import useCustomers from '../../customers/hooks/useCustomers';
import useOrders from '../../orders/hooks/useOrders';
import { useSnack } from '../../providers/SnackBarProvider';
import { useCart as useCartContext } from '../../providers/CartProvider';

export default function useCart() {
    const navigate = useNavigate();
    const { setCartInDb, getCustomerById } = useCustomers();
    const { placeNewOrder, updateOrdersInCustomer } = useOrders();
    const { updateStockAfterOrder, getProductById } = useProducts();
    const { customer } = useCurrentCustomer();
    const setSnack = useSnack();
    const { cart, setCart } = useCartContext();

    const handleAddToCart = async (id, quantity) => {
        try {
            if (customer) {
                const updatedCart = [...cart];
                const existingItemIndex = updatedCart.findIndex(item => item.id === id);

                if (existingItemIndex !== -1) {
                    if (quantity === 0) {
                        updatedCart.splice(existingItemIndex, 1);
                        setSnack("info", "Item removed from cart");
                    } else {
                        updatedCart[existingItemIndex].quantity = quantity;
                        setSnack("success", "Cart updated");
                    }
                } else if (quantity > 0) {
                    updatedCart.push({ id, quantity });
                    setSnack("success", "Item added to cart");
                }

                await setCartInDb(customer._id, updatedCart);
                setCart(updatedCart);
            }
        } catch (err) {
            console.log(err);
            setSnack("error", "Failed to update cart");
        }
    };

    const handleRemoveItemFromCart = async (id) => {
        try {
            if (customer) {
                const updatedCart = cart.filter(item => item.id !== id);
                setCart(updatedCart);
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
        if (!customer) {
            setSnack("error", "Please Login")
            return false
        }
        if (isStockIssue) {
            return false
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

    return {
        handleAddToCart,
        cart,
        navigate,
        handleRemoveItemFromCart,
        setCart,
        handlePlaceOrder
    };
}
