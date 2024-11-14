import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import { useNavigate } from 'react-router-dom'
import { useCurrentCustomer } from '../customers/provider/UserProvider'
import useCustomers from '../customers/hooks/useCustomers'
import { useCart } from '../providers/CartProvider'
import { useSnack } from '../providers/SnackBarProvider'

export default function Layout({ children }) {
    const navigate = useNavigate();
    const { cart } = useCart();
    const { customer } = useCurrentCustomer();
    const { getCustomerById } = useCustomers();
    const [customerDetails, setCustomerDetails] = useState();
    const setSnack = useSnack()

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                if (customer) {
                    let currentCustomer = await getCustomerById(customer?._id);
                    setCustomerDetails(currentCustomer);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchCustomerDetails();
    }, [customer]);

    return (
        <>
            <Header
                navigate={navigate}
                cart={cart}
                customerDetails={customerDetails}
            />
            <Main>{children}</Main>
            <Footer navigate={navigate} customer={customer} setSnack={setSnack} />
        </>
    );
}
