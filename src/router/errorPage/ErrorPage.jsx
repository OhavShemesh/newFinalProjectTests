import React from 'react'
import ErrorComponent from './ErrorComponent'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
    const navigate = useNavigate()
    const handleRetry = () => {
        navigate(-1)
    };

    return (
        <ErrorComponent handleRetry={handleRetry} />
    )
}
