import React, { useEffect, useState } from 'react'
import DisplayGrid from '../../components/Home/DisplayGrid'
import axios from 'axios'
import { useParams } from 'react-router-dom';

const Categories = () => {
    const [products, setProducts] = useState([]);
    const { category } = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.MODE === 'production' 
                      ? import.meta.env.VITE_PROD_API_URL 
                      : import.meta.env.VITE_DEV_API_URL}/categories/${category}`
                );


                setProducts(response.data);
                console.log("Products fetched:", response.data);         
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }   , [category]);

    return (
        <div>
           <DisplayGrid products={products} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    )
}

export default Categories
