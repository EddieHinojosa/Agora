import React, { useState } from 'react';
import DisplayCard from './DisplayCard';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const DisplayGrid = ({ products = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className='mt-8 w-full'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 w-full'>
        {currentProducts.map((product) => (
          <DisplayCard
            key={product._id}
            img={product.image_urls[0]}
            name={product.productName}
            shop={product.shopName}
            // shop={user.shopName}?
            // shop={product.user.shopName}?
            price={product.price}
          />
        ))}
      </div>
      <div className='mt-4 flex justify-center items-center space-x-4'>
        {currentPage > 1 && (
          <button onClick={handlePrevPage} className="text-xl p-2">
            <FaArrowAltCircleLeft />
          </button>
        )}
        {currentPage < totalPages && (
          <button onClick={handleNextPage} className="text-xl p-2">
            <FaArrowAltCircleRight />
          </button>
        )}
      </div>
    </div>
  );
};


export default DisplayGrid;
