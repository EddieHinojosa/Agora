import React from "react";
import { useLocation } from "react-router-dom";
import DisplayGrid from '../components/Home/DisplayGrid';

const SearchResults = () => {
  const location = useLocation();
  const products = location.state?.products || [];

  const noProductGif = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHM3bnVkbXJ1ZDI4Y3g2cnZ4OXowbXlldGJnbGxheXR4bjN3bHZrOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/k61nOBRRBMxva/giphy.gif'

  return (
    <div className="min-h-screen p-4">
      <h2 className="text-2xl mb-4">Search Results</h2>
      {products.length > 0 ? (
        <DisplayGrid products={products} />
      ) : (
        <div className="flex flex-col items-center">
        <h2 className="text-xl mb-4">No products found.</h2>
        <img src={noProductGif} alt="Sad Dawson" className="w-auto" />
        </div>
      )}
    </div>
  );
};

export default SearchResults;



