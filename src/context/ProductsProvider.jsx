import { useEffect, useState } from 'react'
import { ProductsContext } from './ProductsContext'


export const ProductsProvider = ({ children }) => {

    const [products, setproducts] = useState([])

    const fetchproducts = async () => {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        setproducts(data)
    }

    useEffect(() => {
        fetchproducts()
    }, [])

    return (
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )
}