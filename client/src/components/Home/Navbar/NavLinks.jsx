import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = ({ isOpen }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4 ${
        isOpen ? 'flex' : 'hidden md:flex'
      }`}
    >
      <Link to="categories/accessories" className="hover:underline text-sm">
        Accessories
      </Link>
      <Link to="categories/art" className="hover:underline text-sm">
        Art & Collectibles
      </Link>
      <Link to="categories/clothing" className="hover:underline text-sm">
        Clothing
      </Link>
      <Link to="categories/homedecor" className="hover:underline text-sm">
        Home Decor
      </Link>
      <Link to="categories/food&drink" className="hover:underline text-sm">
        Food & Drink
      </Link>
      <Link to="categories/jewelry" className="hover:underline text-sm">
        Jewelry
      </Link>
      <Link to="categories/novelty" className="hover:underline text-sm">
        Paper & Novelty
      </Link>
      <Link to="categories/pets" className="hover:underline text-sm">
        Pets
      </Link>
    </div>
  );
};

export default NavLinks;
