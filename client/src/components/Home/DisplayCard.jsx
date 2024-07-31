import React from 'react';

const Card = ({ img, name, store, price }) => {
  return (
    <div className="bg-white p-4 border border-gray-300">
      <img
        src={img}
        alt={name}
        className="w-full h-32 object-cover mb-4"
      />
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-700">{store}</p>
      <p className="text-gray-700">{price}</p>
    </div>
  );
};

export default Card;
