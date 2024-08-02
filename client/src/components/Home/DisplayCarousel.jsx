import React, { useState } from 'react';
import DisplayCard from './DisplayCard';
import { FaArrowAltCircleRight } from "react-icons/fa";

// Currently putting products and user in code until functional in DB

const DisplayCarousel = ({ products, user }) => {
  const [currentSet, setCurrentSet] = useState(0);

  const handleNextSet = () => {
    setCurrentSet((prevSet) => (prevSet + 5) % products.length);
  };

  const displayedProducts = products.slice(currentSet, currentSet + 5);

  return (
    <div className='mt-8 w-full'>
      <div className='flex justify-center items-center space-x-4'>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 w-full'>
          {displayedProducts.map((product) => (
            <DisplayCard
              key={product.id}
              img={product.image_urls[0]}
              name={product.name}
              shop={product.shopName}
              // shop={user.shopName}?
              // shop={product.user.shopName}?
              price={product.price}
            />
          ))}
        </div>
        </div>
        <div className='mt-4 flex justify-center'>
          <button onClick={handleNextSet} className="text-xl">
            <FaArrowAltCircleRight />
          </button>
      </div>
    </div>
  );
};

export default DisplayCarousel;


