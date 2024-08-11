import React from 'react';

const FormField = ({ label, name, register, errors, type = 'text' }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="w-full p-2 border rounded"
      />
      {errors[name] && <p className="text-red-600 text-sm">{errors[name].message}</p>}
    </div>
  );
};

export default FormField;

