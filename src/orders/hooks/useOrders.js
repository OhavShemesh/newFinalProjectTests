import axios from 'axios'
import React, { useEffect } from 'react'

export default function useOrders() {

    const ordersApi = "http://localhost:8181/orders";


    const placeNewOrder = async (orderDetails) => {
        try {
            const response = await axios.post(ordersApi, orderDetails)
            const data = response.data
            return data
        } catch (err) {
            console.log(err);

        }
    }

    const getAllOrders = async () => {
        try {
            const response = await axios.get(ordersApi)
            const data = response.data
            return data
        } catch (err) {
            console.log(err);

        }
    }

    const updateOrdersInCustomer = async (customerId, orderId) => {
        try {
            const response = await axios.patch(`${ordersApi}/updateOrders`, {
                customerId: customerId,
                orderId: orderId
            });
            return response.data;
        } catch (err) {
            console.log(err);

            throw err;
        }
    };
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.patch(`${ordersApi}/updateOrderStatus`, {
                orderId: orderId,
                newStatus: newStatus
            });
            return response.data;
        } catch (err) {
            console.log(err);

            throw err;
        }
    };
    const getOrderById = async (id) => {
        try {
            const response = await axios.get(`${ordersApi}/${id}`)
            return response.data
        } catch (err) {
            console.log(err);

            throw err;

        }
    }
    return {
        placeNewOrder,
        getAllOrders,
        updateOrdersInCustomer,
        updateOrderStatus,
        getOrderById
    }

}
