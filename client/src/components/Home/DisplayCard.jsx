import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, img, name, shop, price }) => {
  return (
    <Link to={`/details/${id}`} className="block pl-2 pb-2 bg-white">
      <img
        src={img}
        alt={name}
        className="w-full object-cover mb-4 transition-transform duration-300 transform hover:scale-105 hover:z-10"
      />
      <h3 className="text-sm font-bold">{name}</h3>
      <p className="text-gray-700 text-sm">{shop}</p>
      <p className="text-gray-700 text-sm">{price}</p>
    </Link>
  );
};

export default Card;
