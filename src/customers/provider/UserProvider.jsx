import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getToken, getCustomer } from "../../localStorageFunctions/useLocalStorage";

const customerContext = createContext();

export default function CustomerProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(getToken());


  useEffect(() => {
    if (!customer) {
      const customerFromLocalStorage = getCustomer();

      setCustomer(customerFromLocalStorage);

    }
  }, [customer]);

  return (
    <customerContext.Provider value={{ customer, setCustomer, token, setToken }}>
      {children}
    </customerContext.Provider>
  );
}

export const useCurrentCustomer = () => {
  const context = useContext(customerContext);
  if (!context) {
    throw new Error("useCurrentCustomer must be used within provider");
  }

  return context;
};
