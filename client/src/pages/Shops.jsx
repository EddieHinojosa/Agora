import React from 'react';
import { useParams } from 'react-router-dom';
import UserData from '../components/ShopManager/Main/UserData';
import DisplayGrid from '../components/Home/DisplayGrid';

const Shop = () => {
  const { slug } = useParams();

  return (
    <UserData
      userId={slug}
      isManager={false}
      render={(userData) => (
        <div>
          <h2 className='flex justify-center items-center bg-gray-100 p-4 font-bold text-2xl'>Welcome to {userData.shopName}'s Shop!</h2>
          <DisplayGrid />
        </div>
      )}
    />
  );
};

export default Shop;


