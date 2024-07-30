import React, { useState } from "react";

// Shipping Section
const ShippingSection = ({ onNext, onPrevious }) => {

    // incorporate a fetch or something for the dropdown?

    const [showAddAddress, setShowAddAddress] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [addresses, setAddresses] = useState([

      // Hard Coded for now.
      '123 Main, Atlanta, GA 12345',
      '456 Marty St, Atlanta, GA, 12345',
    ]);
    const [selectedAddress, setSelectedAddress] = useState('');
  
    const handleAddAddressClick = () => {
      setShowAddAddress(true);
    };
  
    const handleSaveAddress = () => {
      if (address.trim() && city.trim() && state.trim() && zip.trim()) {
        const newAddress = `${address}, ${city}, ${state}, ${zip}`;
        setAddresses([...addresses, newAddress]);
        setSelectedAddress(newAddress);
        setAddress('');
        setCity('');
        setState('');
        setZip('');
        setShowAddAddress(false);
      }
    };
  
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
              onChange={(e) => setSelectedAddress(e.target.value)}
              className="p-2 block w-2/6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {addresses.map((address, index) => (
                <option key={index} value={address}>
                  {address}
                </option>
              ))}
            </select>
            <button
              className="ml-2 p-2 bg-black text-white rounded-md shadow-sm hover:bg-gray-300 sm:text-sm"
              onClick={handleAddAddressClick}
            >
              Add Address
            </button>
          </div>
          {showAddAddress && (
            <div className="mt-2">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-2 block w-2/6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2"
                placeholder="Address"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="p-2 block w-2/6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2"
                placeholder="City"
              />
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="p-2 block w-2/6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2"
                placeholder="State"
              />
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="p-2 block w-2/6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2"
                placeholder="Zip Code"
              />
              <button
                className="mt-4 p-2 w-2/6 bg-black text-white rounded-md shadow-sm hover:bg-gray-300 sm:text-sm"
                onClick={handleSaveAddress}
              >
                Save
              </button>
            </div>
          )}
        </div>
  
        {/* Item Weight */}
        <div>
          <label htmlFor="itemWeight" className="mt-4 block text-sm font-medium text-gray-700">
            Item Weight
          </label>
          <div className="flex items-center mt-1">
            <input
              type="text"
              id="itemWeight"
              name="itemWeight"
              className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder=""
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
              className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder=""
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
              className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder=""
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
            Packed Height
          </label>
          <div className="flex items-center mt-1">
            <input
              type="text"
              id="processingTime"
              name="processingTime"
              className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder=""
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
            Processing Time
          </label>
          <div className="flex items-center mt-1">
            <input
              type="text"
              id="processingTime"
              name="processingTime"
              className="p-2 block w-1/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder=""
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

  export default ShippingSection