import { jwtDecode } from "jwt-decode";

export const setToLocalStorage = (key, data) => {
    localStorage.setItem(key, data);
}

export const getFromLocalStorage = (key) => {
    let itemsFromLocalStorage = localStorage.getItem(key)
    return itemsFromLocalStorage
}
const TOKEN = "token";

export const setTokenInLocalStorage = (jwtToken) => {
    localStorage.setItem(TOKEN, jwtToken);
};

export const removeToken = () => localStorage.removeItem(TOKEN);

export const getToken = () => localStorage.getItem(TOKEN);

export const getCustomer = () => {
    try {
        const myToken = getToken();
        return jwtDecode(myToken);
    } catch (err) {

        return null;
    }
};


