import React from 'react';

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
  const handleChange = (field) => (e) => {
    setAddress({ ...address, [field]: e.target.value });
  }

  return (
    <div>
      <Input label="Address Line 1" value={address.line1} onChange={handleChange('line1')} />
      <Input label="Address Line 2" value={address.line2} onChange={handleChange('line2')} />
      <Input label="City" value={address.city} onChange={handleChange('city')} />
      <Dropdown label="State" value={address.state} onChange={handleChange('state')} options={states} />
      <Input label="Zip" value={address.zip} onChange={handleChange('zip')} />
      <Dropdown label="Country" value={address.country} onChange={handleChange('country')} options={countries} />
    </div>
  );
};

export default ShippingSettings;
