import React, {useState} from 'react';

const Input = ({ label, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="block w-full mt-1 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
      />
    </div>
  );
};

const Dropdown = ({ label, value, onChange, options }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="block w-full mt-1 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
      >
        <option value="" disabled>Select {label.toLowerCase()}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const ShippingSettings = ({ address, setAddress, states, countries }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field) => (e) => {
    setAddress({ ...address, [field]: e.target.value });
  }

  return (
    <div>
      {!isEditing && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">Shipping Address:</h2>
          <p>{address.line1}</p>
          <p>{address.line2}</p>
          <p>{address.city}, {address.state} {address.zip}</p>
          <p>{address.country}</p>
        </div>
      )}
    
    
      <button onClick={() => setIsEditing(!isEditing)} className="mb-4 px-4 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
        {isEditing ? 'Cancel' : 'Edit Shipping Address'}
      </button>

      {isEditing && (
      <div>
      <Input label="Address Line 1" value={address.line1} onChange={handleChange('line1')} />
      <Input label="Address Line 2" value={address.line2} onChange={handleChange('line2')} />
      <Input label="City" value={address.city} onChange={handleChange('city')} />
      <Dropdown label="State" value={address.state} onChange={handleChange('state')} options={states} />
      <Input label="Zip" value={address.zip} onChange={handleChange('zip')} />
      <Dropdown label="Country" value={address.country} onChange={handleChange('country')} options={countries} />
    </div>
    )}
  </div>
  );
};

export default ShippingSettings;
