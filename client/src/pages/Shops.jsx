import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserData from '../components/ShopManager/Main/UserData';
import DisplayGrid from '../components/Home/DisplayGrid';
import axios from 'axios';


const testProducts = []


const Shop = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState(testProducts)


useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.MODE === 'production' 
                      ? import.meta.env.VITE_PROD_API_URL 
                      : import.meta.env.VITE_DEV_API_URL}/shop/${slug}/products
                      `
                );
                setProducts(response.data);
                console.log("Products fetched:", response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
   //// deleting the following line creates an endless loop that withh result in error code 429
    }, [slug]);
  return (
    <UserData
      userId={slug}
      isManager={false}
      render={(userData) => (
          <div>
          <h2 className='flex justify-center items-center bg-gray-100 p-4 text-4xl'>Welcome to {userData.shopName}'s Shop!</h2>
          <DisplayGrid products={products} />
        </div>
  
      )}
    />
  );
};

export default Shop;


