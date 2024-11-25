import axios from 'axios';
import { useEffect } from 'react';

export default function useCustomers() {

    const CustomersApi =
        window.location.hostname === "localhost"
            ? "http://localhost:8181/customers"
            : "https://newback-ye1s.onrender.com/customers";


    const register = async (registerData) => {
        try {
            let customer = await axios.post(CustomersApi, registerData);
            return customer.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    const login = async (loginDetails) => {
        try {
            let customer = await axios.post(`${CustomersApi}/login`, loginDetails)

            return customer.data

        } catch (err) {
            console.log(err);

        }
    }

    const changePasword = async (email, newPassword) => {
        try {            
            let customer = await axios.patch(`${CustomersApi}/changePassword`, { email: email, newPassword: newPassword })
            return customer.data
        } catch (err) {
            console.log(err);

        }
    }

    const getAllCustomers = async () => {
        try {
            let customers = await axios.get(CustomersApi)
            return customers.data

        } catch (err) {
            console.log(err);

        }

    }
    const getCustomerByEmail = async (email) => {
        try {
            let customer = await axios.get(`${CustomersApi}/getCustomerByEmail`, { params: { email } })
            return customer.data
        } catch (err) {
            console.log(err);

        }
    }

    const getCustomerById = async (id) => {
        try {
            let customer = await axios.get(`${CustomersApi}/${id}`)
            return customer.data

        } catch (err) {
            console.log(err);
        }

    }
    const updateCustomer = async (id, infoAfterChange) => {
        try {
            let customer = await axios.put(`${CustomersApi}/updateCustomer`, { id: id, infoAfterChange: infoAfterChange })
            return customer.data
        } catch (err) {
            console.log(err);

        }
    }


    const getCartFromDb = async (id) => {
        try {
            let customer = await axios.get(`${CustomersApi}/${id}`)
            return customer.data.cart

        } catch (err) {
            console.log(err);

        }

    }


    const setCartInDb = async (customer_id, product) => {

        try {
            const response = await axios.patch(`${CustomersApi}/${customer_id}`, { product })
            const data = response.data

            return data

        } catch (err) {
            console.log(err);

        }
    }

    const updateBusinessStatus = async (secretCode, code, customerId) => {
        if (secretCode === code) {
            try {
                const response = await axios.patch(`${CustomersApi}/updateBusiness`, { customerId });
                return response.data
            } catch (error) {
                return true
            }
        } else {
            return "wrong code"
        }
    }

    const changeBusinessStatus = async (customerId) => {
        try {
            const response = await axios.patch(`${CustomersApi}/updateBusiness`, { customerId });
            return response.data
        } catch (err) {
            console.log(err);

        }
    }

    const sendContactMessage = async (message, customerId) => {
        try {
            const response = await axios.patch(`${CustomersApi}/contactMessage`, { customerId: customerId, message: message })
            const data = response.data
            return data
        } catch (err) {
            console.log(err);

        }
    }
    const deleteContactMessage = async (message, customerId) => {
        try {
            const response = await axios.patch(`${CustomersApi}/deleteMessage`, { customerId: customerId, message: message })
            const data = response.data
            return data
        } catch (err) {
            console.log(err);

        }
    }

    const sendEmail = async (recipient, subject, body) => {
        try {
            const response = axios.post(`${CustomersApi}/sendMail`, { recipient: recipient, subject: subject, body: body })
            const data = response.data
            return data
        } catch (err) {
            console.log(err);

        }
    }
    const likeProducts = async (productId, customerId) => {
        try {
            const response = await axios.patch(`${CustomersApi}/likeProduct`, { productId: productId, customerId: customerId })
            const data = response.data
            return data
        } catch (err) {
            console.log(err);

        }
    }
    const deleteOrderFromCustomer = async (customerId, orderId) => {
        try {
            console.log("customerId", customerId);
            console.log("orderId", orderId);


            const response = await axios.patch(`${CustomersApi}/deleteOrderFromCustomer`, { customerId: customerId, orderId: orderId })
            const data = response.data
            return data
        } catch (err) {
            console.log(err);

        }
    }


    return {
        register,
        login,
        getCustomerById,
        getCartFromDb,
        setCartInDb,
        updateBusinessStatus,
        sendContactMessage,
        getAllCustomers,
        deleteContactMessage,
        sendEmail,
        likeProducts,
        updateCustomer,
        deleteOrderFromCustomer,
        changeBusinessStatus,
        getCustomerByEmail,
        changePasword
    }

}
