import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import useCart from '../products/hooks/useCart'
import { useCurrentCustomer } from '../customers/provider/UserProvider'
import useCustomers from '../customers/hooks/useCustomers'


export default function Layout({ children }) {

    const { navigate, cart } = useCart()
    const { customer } = useCurrentCustomer()
    const { getCustomerById } = useCustomers()
    const [customerDetails, setCustomerDetails] = useState()

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                if (customer) {
                    let currentCustomer = await getCustomerById(customer?._id)
                    setCustomerDetails(currentCustomer)
                }
            } catch (err) {
                console.log(err);

            }
        }
        fetchCustomerDetails()
    }, [customer])



    return (
        <>
            <Header navigate={navigate} cart={cart} customerDetails={customerDetails} />
            <Main>{children}</Main>
            <Footer navigate={navigate} />
        </>
    )
}
