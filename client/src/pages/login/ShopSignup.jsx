import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import FormField from '../../components/FormField';
import SelectField from '../../components/SelectField';

const schema = yup.object().shape({
    billingStreetAddress: yup.string().required('Billing Street Address is required'),
    billingZipcode: yup.string().required('Billing Zipcode is required'),
    billingCity: yup.string().required('Billing City is required'),
    billingState: yup.string().required('Billing State is required'),
    billingCountry: yup.string().required('Billing Country is required'),
    mailingStreetAddress: yup.string().required('Mailing Street Address is required'),
    mailingZipcode: yup.string().required('Mailing Zipcode is required'),
    mailingCity: yup.string().required('Mailing City is required'),
    mailingState: yup.string().required('Mailing State is required'),
    mailingCountry: yup.string().required('Mailing Country is required'),
});

const states = ["California", "New York", "Texas", "Florida", "Illinois"]; // Example states
const countries = ["United States", "Canada", "Mexico"]; // Example countries

const ShopSignup = () => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.billingAddress) {
                setValue('billingStreetAddress', user.billingAddress.streetAddress);
                setValue('billingZipcode', user.billingAddress.zipcode);
                setValue('billingCity', user.billingAddress.city);
                setValue('billingState', user.billingAddress.state);
                setValue('billingCountry', user.billingAddress.country);
            }
            if (user.mailingAddress) {
                setValue('mailingStreetAddress', user.mailingAddress.streetAddress);
                setValue('mailingZipcode', user.mailingAddress.zipcode);
                setValue('mailingCity', user.mailingAddress.city);
                setValue('mailingState', user.mailingAddress.state);
                setValue('mailingCountry', user.mailingAddress.country);
            }
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/shop/signup', 'https://agora-crafts.onrender.com/api/shop/signup', data);
            alert('Shop signup successful');
            navigate('/');
        } catch (error) {
            if (error.response) {
                alert('Shop signup failed: ' + error.response.data.message);
            } else {
                alert('Shop signup failed: ' + error.message);
            }
        }
    };

    const handleAddressCheck = () => {
        setValue('mailingStreetAddress', watch('billingStreetAddress'));
        setValue('mailingZipcode', watch('billingZipcode'));
        setValue('mailingCity', watch('billingCity'));
        setValue('mailingState', watch('billingState'));
        setValue('mailingCountry', watch('billingCountry'));
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 mt-10 shadow-md rounded">
            <h1 className="text-2xl font-bold mb-6 text-center">Shop Signup</h1>
            <p className="text-center text-sm text-gray-600 mb-4">Please confirm your mailing and billing addresses.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormField label="Billing Street Address" name="billingStreetAddress" register={register} errors={errors} />
                <FormField label="Billing Zipcode" name="billingZipcode" register={register} errors={errors} />
                <FormField label="Billing City" name="billingCity" register={register} errors={errors} />
                <SelectField label="Billing State" name="billingState" register={register} errors={errors} options={states} />
                <SelectField label="Billing Country" name="billingCountry" register={register} errors={errors} options={countries} />
                
                <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" onClick={handleAddressCheck} />
                    <label className="ml-2 block text-sm text-gray-900">Mailing address same as billing</label>
                </div>
                
                <FormField label="Mailing Street Address" name="mailingStreetAddress" register={register} errors={errors} />
                <FormField label="Mailing Zipcode" name="mailingZipcode" register={register} errors={errors} />
                <FormField label="Mailing City" name="mailingCity" register={register} errors={errors} />
                <SelectField label="Mailing State" name="mailingState" register={register} errors={errors} options={states} />
                <SelectField label="Mailing Country" name="mailingCountry" register={register} errors={errors} options={countries} />
                
                <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">Register</button>
                <p className="text-center text-sm text-gray-600 mt-4">Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link></p>
            </form>
        </div>
    );
};

export default ShopSignup;

