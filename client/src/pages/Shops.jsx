import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import UserData from '../components/ShopManager/Main/UserData';
import DisplayGrid from '../components/Home/DisplayGrid';


const testProducts = [
  {
    id: '1',
    name: 'bubblegum',
    price: 1.99,
    image_urls: [''],
    shopName: 'Shop A',
  },
  {
    id: '2',
    name: 'baseball',
    price: 20.99,
    image_urls: [''],
    shopName: 'Shop B',
  },
  {
    id: '3',
    name: 'shoes',
    price: 30.99,
    image_urls: [''],
    shopName: 'Shop C',
  },
  {
    id: '4',
    name: 'hat',
    price: 10.99,
    image_urls: [''],
    shopName: 'Shop D',
  },
  
];

const Shop = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState(testProducts)

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


