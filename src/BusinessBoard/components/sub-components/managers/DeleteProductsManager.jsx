import React, { useEffect, useState } from 'react'
import DeleteProductsComponent from '../DeleteProductsComponent'
import useProducts from '../../../../products/hooks/useProducts'

export default function DeleteProductsManager() {
    const { deleteProduct, getProducts, toTitleCase } = useProducts()
    const [isloading, setIsLoading] = useState(true)
    const [allProducts, setAllProducts] = useState()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts()
                setAllProducts(products)

            } catch (err) {
                console.log(err);

            } finally {
                setIsLoading(false)
            }

        }
        fetchProducts()
    }, [])


    const handleDelete = async (id) => {
        await deleteProduct(id)

    }
    if (isloading) {
        return <div>Loading...</div>;
    }

    if (!allProducts) {
        return <div>Product not found.</div>;
    }


    return (
        <DeleteProductsComponent handleDelete={handleDelete} products={allProducts} toTitleCase={toTitleCase} />
    )
}
