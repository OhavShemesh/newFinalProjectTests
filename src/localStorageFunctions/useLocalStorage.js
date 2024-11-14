import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const TOKEN = "token";

export const setTokenInLocalStorage = (jwtToken) => {
    localStorage.setItem(TOKEN, jwtToken);
    let storedTokenInHeader = axios.defaults.headers.common['x-auth-token'] = jwtToken;

};

export const removeToken = () => {
    localStorage.removeItem(TOKEN);
    delete axios.defaults.headers.common['x-auth-token'];
};


export const getToken = () => {
    return localStorage.getItem(TOKEN);
};

export const getCustomer = () => {
    try {
        const myToken = getToken();
        return jwtDecode(myToken);
    } catch (err) {
        return null;
    }
};

export const setTokenInHeaders = () => {
    const token = getToken();
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    }
};

setTokenInHeaders();