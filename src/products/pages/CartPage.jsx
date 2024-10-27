import React, { useEffect } from 'react'
import CartComponent from '../components/CartComponent'
import CartCheckCustomer from '../helpers/CartCheckCustomer'


export default function CartPage() {

    return (
        <>
            <CartCheckCustomer />
            <CartComponent />
        </>
    )
}
