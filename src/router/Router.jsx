import React from 'react'
import { Route, Routes } from "react-router-dom";
import ProductsPage from '../products/ProductsPage';
import ROUTES from './routesModel';
import RegitsterPage from '../customers/pages/RegitsterPage';
import LoginPage from '../customers/pages/LoginPage';
import CartPage from '../products/pages/CartPage';
import BusinessBoardPage from '../BusinessBoard/BusinessBoardPage';
import ManageMyOrdersPage from "../customers/manageOrders/ManageMyOrdersPage";
import ProfilePage from '../customers/profile/ProfilePage';
import ContactPage from '../layout/components/sub-component/contact/ContactPage';
import AboutPage from '../layout/components/sub-component/about/AboutPage';
import SingleProductPage from '../products/pages/SingleProductPage';
import ErrorComponent from './errorPage/ErrorComponent';
import ForgotPasswordPage from '../customers/pages/ForgotPasswordPage';


export default function Router() {
    return (
        <Routes>
            <Route path={ROUTES.ROOT} element={<ProductsPage />} />
            <Route path={ROUTES.REGISTER} element={<RegitsterPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.PRODUCT_INFO + "/:id"} element={<SingleProductPage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path={ROUTES.BUSINESS_BOARD} element={<BusinessBoardPage />} />
            <Route path={ROUTES.MANAGE_MY_ORDERS} element={<ManageMyOrdersPage />} />
            <Route path={ROUTES.PROFILE_PAGE} element={<ProfilePage />} />
            <Route path={ROUTES.CONTACT} element={<ContactPage />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.FORGOTPASSWORD} element={<ForgotPasswordPage />} />
            <Route path={ROUTES.ERROR404} element={<ErrorComponent />} />
        </Routes>
    )
}
