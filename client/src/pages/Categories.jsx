import React, { useEffect, useState } from 'react'
import DisplayGrid from '../components/Home/DisplayGrid'
import axios from 'axios'

const Categories = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.MODE === 'production' 
                      ? import.meta.env.VITE_PROD_API_URL 
                      : import.meta.env.VITE_DEV_API_URL}`
                );
                setProducts(response.data);
                console.log("Products fetched:", response.data);         
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }   , [])

    return (
        <div>
           <DisplayGrid products={products}/>
        </div>
    )
}

export default Categories
