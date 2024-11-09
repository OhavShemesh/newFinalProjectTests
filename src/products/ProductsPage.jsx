import React, { useEffect, useState } from 'react'
import ProductComponent from './components/ProductComponent';
import useProducts from './hooks/useProducts';
import ProductsFilter from './helpers/ProductsFilter';
import useCart from './hooks/useCart';
import { useCurrentCustomer } from '../customers/provider/UserProvider';

export default function ProductsPage() {
    const { allProducts, navigate, toTitleCase } = useProducts();
    const [category, setCategory] = useState("");
    const { handleAddToCart, isAddedMap, cart } = useCart()


    return (
        <>
            <ProductsFilter setCategory={setCategory} />
            <ProductComponent
                allProducts={allProducts}
                handleAddToCart={handleAddToCart}
                isAddedMap={isAddedMap}
                navigate={navigate}
                category={category}
                cart={cart}
                toTitleCase={toTitleCase} />
        </>
    )
}
