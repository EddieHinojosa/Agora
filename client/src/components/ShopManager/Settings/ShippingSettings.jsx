import { updateUserShopSettings } from '../../../api/shopSettingsApi';

const ShippingSettings = ({ address, setAddress, states, countries, userId }) => {
  const handleSaveAddress = async () => {
    try {
      const response =
      await updateUserShopSettings(userId, null, address);
      setAddress({ line1: '', line2: '', city: '', state: '', zip: '', country: '' });
      console.log('Shipping address saved', response);
    } catch (error) {
      console.error('Error updating shipping address:', error);
    }
  };

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

      <div className="mb-4">
        <button
          onClick={handleSaveAddress}
          className="px-4 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Address
        </button>
      </div>
    </div>
  );
};

export default ShippingSettings;
