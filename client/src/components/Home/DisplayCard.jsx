import React from 'react';

const Card = ({ img, name, shop, price }) => {
  return (
    <div className="bg-white">
      <img
        src={img}
        alt={name}
        className="w-full h-32 object-cover mb-4"
      />
      <h3 className="text-sm font-bold">{name}</h3>
      <p className="text-gray-700 text-sm">{shop}</p>
      <p className="text-gray-700 text-sm">{price}</p>
    </div>
  );
};

export default Card;
