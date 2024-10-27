import React from 'react'
import RegisterComponent from '../components/RegisterComponent'
import useForm from '../../formHelpers/useForm'
import signupSchema from '../../formHelpers/schemas/signupSchema'
import initialRegisterForm from '../helpers/initialForms/initialRegisterForm'
import useCustomers from '../hooks/useCustomers'
import { setToLocalStorage } from '../../localStorageFunctions/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../router/routesModel'

export default function RegitsterPage() {

    const { register } = useCustomers()
    const navigate = useNavigate()

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
            let customer = await register(fixData)
            setToLocalStorage("token", customer)
            navigate(ROUTES.ROOT)
        } catch (err) {
            console.log(err);

        }



    }

    const { handleChange, error, isFormValid, onSubmit } = useForm(initialRegisterForm, signupSchema, handleSubmit)



    return (
        <RegisterComponent onSubmit={onSubmit} isFormValid={isFormValid} handleSubmit={handleSubmit} handleChange={handleChange} error={error} />
    )
}
