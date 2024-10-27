import React from 'react'
import useForm from '../../formHelpers/useForm'
import useCustomers from '../hooks/useCustomers'
import { setToLocalStorage } from '../../localStorageFunctions/useLocalStorage'
import LoginComponent from '../components/LoginComponent'
import loginSchema from '../../formHelpers/schemas/loginSchema'
import initialLoginForm from '../helpers/initialForms/initialLoginForm'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../router/routesModel'

export default function LoginPage() {
    const navigate = useNavigate()

    const { login } = useCustomers()

    const handleSubmit = async (loginDetails) => {

        let customer = await login(loginDetails)
        setToLocalStorage("token", customer)
        navigate(ROUTES.ROOT)
        window.location.reload();


    }

    const { handleChange, error, isFormValid, onSubmit } = useForm(initialLoginForm, loginSchema, handleSubmit)



    return (
        <LoginComponent onSubmit={onSubmit} isFormValid={isFormValid} handleSubmit={handleSubmit} handleChange={handleChange} error={error} />
    )
}
