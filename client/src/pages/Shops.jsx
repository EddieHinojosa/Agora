import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserData from '../components/ShopManager/Main/UserData';
import DisplayGrid from '../components/Home/DisplayGrid';
import { IoIosStar } from "react-icons/io";
import axios from 'axios';


const Shop = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([])


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
        <div className='min-h-screen flex flex-col items-start justify-start bg-gray-50 px-4 md:px-10 pt-0'>
          <h2 className='w-full flex justify-left mt-4 text-3xl'>{userData.shopName} Shop</h2>
          <p className='w-full flex justify-left mt-6 text-sm'>
            {[...Array(5)].map((_, index) => (
              <IoIosStar key={index} />
            ))}
          </p>
          {userData.shopShippingAddress ? (
          <p className='w-full flex justify-left text-gray-700 text-sm'>
            {userData.shopShippingAddress.city}, {userData.shopShippingAddress.state}</p> ) : null}
            {userData.shopDescription ? (
          <p className='w-1/2 flex justify-left mt-4 text-gray-700 text-sm'>{userData.shopDescription}</p> ) : null}
          <DisplayGrid products={products} />
        </div>
      )}
    />
  );
};

export default Shop;


