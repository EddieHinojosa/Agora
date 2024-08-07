const ShippingSettings = ({ address, setAddress, states, countries }) => {

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
        <input
          type="text"
          value={address.line1}
          onChange={(e) => setAddress({ ...address, line1: e.target.value })}
          className="block w-full mt-1 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
        <input
          type="text"
          value={address.line2}
          onChange={(e) => setAddress({ ...address, line2: e.target.value })}
          className="block w-full mt-1 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
        <input
          type="text"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          className="block w-full mt-1 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
        <select
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          className="block w-full mt-1 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="" disabled>
            Select a state
          </option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
        <input
          type="text"
          value={address.zip}
          onChange={(e) => setAddress({ ...address, zip: e.target.value })}
          className="block w-full mt-1 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
        <select
          value={address.country}
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
          className="block w-full mt-1 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="" disabled>
            Select a country
          </option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ShippingSettings;
