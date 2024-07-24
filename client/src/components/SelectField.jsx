import React from 'react';

const SelectField = ({ label, name, register, errors, options }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <select {...register(name)} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Select {label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            <p className="text-red-600 text-sm">{errors[name]?.message}</p>
        </div>
    );
};

export default SelectField;

