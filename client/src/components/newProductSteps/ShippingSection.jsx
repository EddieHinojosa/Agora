import React, { useState } from "react";

// Shipping Section
const ShippingSection = ({ onNext, onPrevious, rows, handleChange }) => {

  const [selectedAddress, setSelectedAddress] = useState('');

  const addresses = [
    '123 Main, Atlanta, GA 12345',
    '456 Marty St, Atlanta, GA, 12345',
  ];

  return (
    <div>
      {/* Shipping Address */}
      <div>
        <label htmlFor="shippingAddress" className="mt-14 block text-sm font-medium text-gray-700">
          Shipping Address
        </label>
        <div className="flex items-center mt-1">
          <select
            id="shippingAddress"
            name="shippingAddress"
            value={selectedAddress}
            onChange={(e) => { 
              setSelectedAddress(e.target.value);
              handleChange(e);
            }}
            className="p-2 block w-2/6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {addresses.map((address, index) => (
              <option key={index} value={address}>
                {address}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Item Weight */}
      <div>
        <label htmlFor="productWeight" className="mt-4 block text-sm font-medium text-gray-700">
          Item Weight
        </label>
        <div className="flex items-center mt-1">
          <input
            type="text"
            id="productWeight"
            name="productWeight"
            value={rows.packedWeight}
            className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder=""
            onChange={handleChange}
            onBlur={handleChange}
          />
          <select className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="kg">kg</option>
            <option value="lb">lb</option>
            <option value="g">g</option>
            <option value="oz">oz</option>
          </select>
        </div>
      </div>

      {/* Item Dimensions When Packed */}
      <div>
        <label htmlFor="packedLength" className="mt-4 block text-sm font-medium text-gray-700">
          Packed Length
        </label>
        <div className="flex items-center mt-1">
          <input
            type="text"
            id="packedLength"
            name="packedLength"
            value={rows.packedLength}
            className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder=""
            onChange={handleChange}
            onBlur={handleChange}
          />
          <select className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="mm">mm</option>
            <option value="ft">ft</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="packedWidth" className="mt-4 block text-sm font-medium text-gray-700">
          Packed Width
        </label>
        <div className="flex items-center mt-1">
          <input
            type="text"
            id="packedWidth"
            name="packedWidth"
            value={rows.packedWidth}
            className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder=""
            onChange={handleChange}
            onBlur={handleChange}
          />
          <select className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="mm">mm</option>
            <option value="ft">ft</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="packedHeight" className="mt-4 block text-sm font-medium text-gray-700">
          Packed Height
        </label>
        <div className="flex items-center mt-1">
          <input
            type="text"
            id="packedHeight"
            name="packedHeight"
            value={rows.packedHeight}
            className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder=""
            onChange={handleChange}
            onBlur={handleChange}
          />
          <select className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="cm">cm</option>
            <option value="in">in</option>
            <option value="mm">mm</option>
            <option value="ft">ft</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="processingTime" className="mt-4 block text-sm font-medium text-gray-700">
          Processing Time
        </label>
        <div className="flex items-center mt-1">
          <input
            type="text"
            id="processingTime"
            name="processingTime"
            value={rows.processingTime}
            className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder=""
            onChange={handleChange}
            onBlur={handleChange}
          />
        </div>
      </div>

      {/* Next/Previous Buttons */}
      <div className="flex space-x-4 mt-10">
        <button
          onClick={onPrevious}
          className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShippingSection;
