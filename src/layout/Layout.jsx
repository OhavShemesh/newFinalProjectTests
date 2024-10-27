import React, { useEffect } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import useCart from '../products/hooks/useCart'

export default function Layout({ children }) {

    const { navigate, cart } = useCart()


    return (
        <>
            <Header navigate={navigate} cart={cart} />
            <Main>{children}</Main>
            <Footer />
        </>
    )
}
