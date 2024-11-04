import React from 'react'
import AddProductComponent from '../AddProductComponent'
import useForm from '../../../../formHelpers/useForm'
import initialAddProductFrom from '../../../helpers/initialAddProductFrom'
import addProductSchema from '../../../../formHelpers/schemas/addProductSchema'
import useProducts from '../../../../products/hooks/useProducts'

export default function AddProductManager() {
    const { addProduct } = useProducts()
    const handleSubmit = async (data) => {
        const fixedData = {
            ...data,
            image: {
                alt: data.alt,
                url: data.url,
            },
        };

        let product = await addProduct(fixedData)
    }

    const { handleChange, error, onSubmit, isFormValid } = useForm(initialAddProductFrom, addProductSchema, handleSubmit)

    return (
        <AddProductComponent handleChange={handleChange} error={error} onSubmit={onSubmit} isFormValid={isFormValid} />
    )
}
