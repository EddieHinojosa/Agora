import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaLink } from "react-icons/fa";
import UserData from '../../components/ShopManager/Main/UserData';
import slug from 'slug';
import axios from 'axios';

// Dynamic Status Cards - will pull information from DB
const StatusCard = ({ status, count }) => {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 w-1/3 mx-2">
      <div className="flex justify-center">
        <span className="text-sm font-medium text-center">{status}</span>
      </div>
      <div className="text-center mt-4">
        <span className="text-3xl font-bold">{count}</span>
      </div>
    </div>
  );
};

const ShopManager = () => {
  const { id } = useParams(); 

  // Status Card Code
  const [productCounts, setProductCounts] = useState({
    activeCount: 0,
    totalCount: 0,
    soldOutCount: 0,
  })

  useEffect(() => {
    const fetchProductCounts = async () => {
      try {
        const apiUrl = import.meta.env.MODE === 'production' 
          ? import.meta.env.VITE_PROD_API_URL 
          : import.meta.env.VITE_DEV_API_URL;
          
        const response = await axios.get(`${apiUrl}/api/count/${id}`);
        setProductCounts(response.data);
        console.log('Product has been counted');
      } catch (error) {
        console.error('Error fetching product counts', error);
      }
    };
    fetchProductCounts();
  }, [id]);

  return (
    <UserData
      userId={id}
      isManager={true}
      render={(userData) => {
        // For shop url link
        const baseUrl = window.location.origin;
        const shopNameSlug = slug(userData.shopName);
        const shopUrl = `${baseUrl}/shop/${shopNameSlug}`;

        const settingUpdate = !userData.shopShippingAddress || !userData.shopDescription;

        return (
          <div className='min-h-screen'>
            <div className='justify-center text-center'>
              <h2 className='text-4xl'>Hello {userData.shopName}!</h2>
              <Link to={`/shop/${shopNameSlug}`} className='flex items-center justify-center space-x-2 hover:underline'>
                <FaLink />
                <span>{shopUrl}</span>
              </Link>
            </div>
            <div className="flex justify-center items-center mt-8">
              <StatusCard status="Active Listings" count={productCounts.activeCount} />
              <StatusCard status="Total Quantity" count={productCounts.totalCount} />
              <StatusCard status="Sold Out" count={productCounts.soldOutCount} />
            </div>
            <div className='flex justify-center mt-8'>
    {(!userData.shopShippingAddress && !userData.shopDescription) && (
        <h2>Please Enter Shop Shipping Address and Shop Description.</h2>
    )}
    {(!userData.shopShippingAddress && userData.shopDescription) && (
        <h2>Please Enter Shop Shipping Address.</h2>
    )}
    {(userData.shopShippingAddress && !userData.shopDescription) && (
        <h2>Please Enter Shop Description.</h2>
    )}

</div>
            <div className='flex justify-center'>
                {settingUpdate && (
                <Link to={`/shopmanager/${id}/settings`} className='mt-2 px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-300 hover:text-black'>
                    Shop Settings
                </Link>
                )}
            </div>
          </div>
        );
      }}
    />
  );
};

export default ShopManager;



