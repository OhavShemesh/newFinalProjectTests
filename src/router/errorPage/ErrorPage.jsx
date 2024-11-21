import React from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorComponent from './ErrorComponent';

export default function ErrorPage() {

    const navigate = useNavigate()

    const handlePrevPage = () => {
        navigate(-1)
    }

    return (
        <ErrorComponent handlePrevPage={handlePrevPage} />
    )
}
