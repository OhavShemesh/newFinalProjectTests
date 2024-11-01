import React, { useEffect, useState } from 'react';
import ManageMyOrdersComponent from './ManageMyOrdersComponent';
import { useCurrentCustomer } from '../provider/UserProvider';
import useCustomers from '../hooks/useCustomers';
import useProducts from '../../products/hooks/useProducts';
import useOrders from '../../orders/hooks/useOrders';
import ROUTES from '../../router/routesModel';

export default function ManageMyOrdersPage() {
    const { customer } = useCurrentCustomer();
    const { toTitleCase, navigate, getProductById } = useProducts();
    const { getCustomerById } = useCustomers();
    const { getAllOrders } = useOrders();
    const [customerDetails, setCustomerDetails] = useState();
    const [customerOrders, setCustomerOrders] = useState([]);
    const [productImages, setProductImages] = useState({}); // State to hold images

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                if (customer) {
                    let fetchedDetails = await getCustomerById(customer._id);
                    setCustomerDetails(fetchedDetails);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchCustomerDetails();
    }, [customer]);

    useEffect(() => {
        const fetchCustomerOrders = async () => {
            try {
                let orders = await getAllOrders();
                let customerOrdersFromDb = orders.filter((order) => order.customer_id === customer._id);
                setCustomerOrders(customerOrdersFromDb);
            } catch (err) {
                console.log(err);
            }
        };

        if (customerDetails) {
            fetchCustomerOrders();
        }
    }, [customerDetails]);

    const fetchAllProductImages = async () => {
        const images = {};
        for (const order of customerOrders) {
            for (const product of order.productsAndQuantity) {
                if (!images[product.id]) {
                    try {
                        const productData = await getProductById(product.id);
                        images[product.id] = productData.image;
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        }
        setProductImages(images);
    };

    useEffect(() => {
        if (customerOrders.length > 0) {
            fetchAllProductImages();
        }
    }, [customerOrders]);

    useEffect(() => {
        if (!customer) {
            navigate(ROUTES.ROOT);
        }
    }, [customer]);

    return (
        <ManageMyOrdersComponent
            customerDetails={customerDetails}
            customerOrders={customerOrders}
            toTitleCase={toTitleCase}
            productImages={productImages} 
        />
    );
}
