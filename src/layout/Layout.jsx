import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import { useNavigate } from 'react-router-dom'
import { useCurrentCustomer } from '../customers/provider/UserProvider'
import useCustomers from '../customers/hooks/useCustomers'
import { useCart } from '../providers/CartProvider'
import { useSnack } from '../providers/SnackBarProvider'
import { useCustomTheme } from '../providers/CustomThemeProvider'
import { removeToken } from '../localStorageFunctions/useLocalStorage'

export default function Layout({ children }) {
    const navigate = useNavigate();
    const { cart } = useCart();
    const { customer } = useCurrentCustomer();
    const { getCustomerById } = useCustomers();
    const [customerDetails, setCustomerDetails] = useState();
    const setSnack = useSnack()
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { mode, toggleMode } = useCustomTheme();
    const [isImageValid, setIsImageValid] = useState(true);


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


    const handleUserMenu = (event) => {
        setAnchorElUser((prev) => (prev ? null : event.currentTarget));
    };

    const handleLogout = () => {
        removeToken();
        window.location.reload();
    };



    const settings = ['Profile', "Manage Orders", 'Logout'];


    return (
        <>
            <Header
                navigate={navigate}
                cart={cart}
                customerDetails={customerDetails}
                toggleMode={toggleMode}
                mode={mode}
                customer={customer}
                anchorElUser={anchorElUser}
                handleUserMenu={handleUserMenu}
                settings={settings}
                handleLogout={handleLogout}
                isImageValid={isImageValid}
                setIsImageValid={setIsImageValid}
            />
            <Main>{children}</Main>
            <Footer navigate={navigate} customer={customer} setSnack={setSnack} />
        </>
    );
}
