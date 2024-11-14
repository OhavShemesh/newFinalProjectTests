import React from 'react'
import { Route, Routes } from "react-router-dom";
import ProductsPage from '../products/ProductsPage';
import ROUTES from './routesModel';
import RegitsterPage from '../customers/pages/RegitsterPage';
import SingleProduct from '../products/components/SingleProduct';
import LoginPage from '../customers/pages/LoginPage';
import CartComponent from '../products/components/CartComponent';
import CartPage from '../products/pages/CartPage';
import BusinessBoardPage from '../BusinessBoard/BusinessBoardPage';
import ManageMyOrdersPage from '../customers/manageOrders/manageMyOrdersPage';
import ProfilePage from '../customers/profile/ProfilePage';
import ContactPage from '../layout/components/sub-component/contact/ContactPage';
import AboutPage from '../layout/components/sub-component/about/AboutPage';
import ErrorPage from './errorPage/ErrorPage';
import Error404 from './errorPage/Error404';
import SingleProductPage from '../products/components/SingleProductPage';


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
            <Route path={ROUTES.ERROR404} element={<ErrorPage />} />
        </Routes>
    )
}
