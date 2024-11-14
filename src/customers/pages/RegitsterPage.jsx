import React, { useEffect } from 'react'
import RegisterComponent from '../components/RegisterComponent'
import useForm from '../../formHelpers/useForm'
import signupSchema from '../../formHelpers/schemas/signupSchema'
import initialRegisterForm from '../helpers/initialForms/initialRegisterForm'
import useCustomers from '../hooks/useCustomers'
import { setTokenInLocalStorage } from '../../localStorageFunctions/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../router/routesModel'
import { useSnack } from '../../providers/SnackBarProvider'
import { useCurrentCustomer } from '../provider/UserProvider'

export default function RegitsterPage() {

    const { register } = useCustomers()
    const navigate = useNavigate()
    const setSnack = useSnack()
    const { customer } = useCurrentCustomer()

    useEffect(() => {
        if (customer) {
            navigate(ROUTES.ROOT)
            setSnack("success", "You are already logged in");
        }
    }, [customer, navigate, setSnack])

    const handleSubmit = async (registerationData) => {
        const fixData = {
            name: {
                first: registerationData.first,
                middle: registerationData.middle,
                last: registerationData.last,
            },
            phone: registerationData.phone,
            email: registerationData.email,
            password: registerationData.password,
            image: {
                url: registerationData.url,
                alt: registerationData.alt
            },
            address: {
                city: registerationData.city,
                street: registerationData.street,
                houseNumber: registerationData.houseNumber,
                zip: registerationData.zip
            }

        }

        try {
            let token = await register(fixData)
            setTokenInLocalStorage(token)
            navigate(ROUTES.LOGIN)
        } catch (err) {
            if (err.response && err.response.data && typeof err.response.data === 'string' && err.response.data.includes("email")) {
                setSnack("error", "Email already exists")
            } else {
                console.log(err);
            }
        }



    }

    const { handleChange, error, isFormValid, onSubmit } = useForm(initialRegisterForm, signupSchema, handleSubmit)


    return (
        <RegisterComponent onSubmit={onSubmit} isFormValid={isFormValid} handleSubmit={handleSubmit} handleChange={handleChange} error={error} />
    )
}
