import React, { useEffect, useState } from 'react'
import DeleteProductsComponent from '../DeleteProductsComponent'
import useProducts from '../../../../products/hooks/useProducts'
import { ClipLoader } from 'react-spinners'

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

    const [displayedProducts, setDisplayedProducts] = useState(allProducts);
    const [checkSureMap, setCheckSureMap] = useState({});

    useEffect(() => {
        setDisplayedProducts(allProducts);
    }, [allProducts]);

    const handleCheckSure = (productId, value) => {
        setCheckSureMap(prev => ({ ...prev, [productId]: value }));
    };

    const handleDeleteProduct = (productId) => {
        handleDelete(productId);
        setDisplayedProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        setCheckSureMap(prev => ({ ...prev, [productId]: false }));
    };



    if (isloading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center", width: "100%", pt: 40 }}>
                <ClipLoader size={"60px"} color="turquoise" cssOverride={{ fontWeight: "900" }} />
            </Box>
        )
    }

    if (!allProducts) {
        return <div>Product not found.</div>;
    }


    return (
        <DeleteProductsComponent handleDeleteProduct={handleDeleteProduct} products={allProducts} toTitleCase={toTitleCase} displayedProducts={displayedProducts} handleCheckSure={handleCheckSure} checkSureMap={checkSureMap} />
    )
}
