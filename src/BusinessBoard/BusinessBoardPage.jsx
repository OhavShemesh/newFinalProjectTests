import React, { useEffect, useState } from 'react';
import { useCurrentCustomer } from '../customers/provider/UserProvider';
import MakeCustomerBusiness from './components/MakeCustomerBusiness';
import BusinessBoardComponent from './components/BusinessBoardComponent';
import useCustomers from '../customers/hooks/useCustomers';
import useProducts from '../products/hooks/useProducts';
import useBusinessBoard from './hooks/useBusinessBoard';
import { setTokenInLocalStorage } from '../localStorageFunctions/useLocalStorage';

export default function BusinessBoardPage() {
    const { customer } = useCurrentCustomer();
    const { getCustomerById } = useCustomers();
    const [customerDetails, setCustomerDetails] = useState({});
    const { toTitleCase } = useProducts()
    const { makeBusiness } = useBusinessBoard()
    const [wrongCode, setWrongCode] = useState(false)

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const customerData = await getCustomerById(customer?._id);
                setCustomerDetails(customerData);
            } catch (err) {
                console.log(err);

            }
        };

        if (customer?._id) {
            fetchCustomerDetails();
        }
    }, [customer?._id]);

    const handleSubmitSecretCode = async (code) => {
        try {
            const customerafterbusiness = await makeBusiness(code, customer?._id);
            setTokenInLocalStorage(customerafterbusiness)
            setWrongCode(true)
            window.location.reload()

        } catch (error) {
            console.log(err);

        }
    };



    if (customer?.isBusiness) {

        return <BusinessBoardComponent />;
    } else {
        return <MakeCustomerBusiness customerDetails={customerDetails} toTitleCase={toTitleCase} handleOnSubmitSecretCode={handleSubmitSecretCode} wrongCode={wrongCode} />;
    }
}
