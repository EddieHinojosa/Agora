import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    billingStreetAddress: yup.string().required('Billing Street Address is required'),
    billingZipcode: yup.string().required('Billing Zipcode is required'),
    billingCity: yup.string().required('Billing City is required'),
    billingState: yup.string().required('Billing State is required'),
    billingCountry: yup.string().required('Billing Country is required'),
    username: yup.string().required('Username is required'),
    shopName: yup.string().required('Shop Name is required'),
});

const CompleteProfile = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const profileData = params.get('profile');
        if (profileData) {
            const parsedProfile = JSON.parse(decodeURIComponent(profileData));
            setProfile(parsedProfile);
            setValue('firstName', parsedProfile.firstName);
            setValue('lastName', parsedProfile.lastName);
            setValue('email', parsedProfile.email);
        }
    }, [setValue]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_PROD_API_URL}/api/register`, { ...data, googleId: profile.googleId });
            const { token } = response.data;
            localStorage.setItem('token', token);
            alert('Profile completed successfully');
            navigate('/');
        } catch (error) {
            if (error.response) {
                alert('Profile completion failed: ' + error.response.data.message);
            } else {
                alert('Profile completion failed: ' + error.message);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 mt-10 shadow-md rounded">
            <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input {...register('firstName')} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <p className="text-red-600 text-sm">{errors.firstName?.message}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input {...register('lastName')} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <p className="text-red-600 text-sm">{errors.lastName?.message}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input {...register('email')} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled />
                    <p className="text-red-600 text-sm">{errors.email?.message}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input {...register('username')} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <p className="text-red-600 text-sm">{errors.username?.message}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Billing Street Address</label>
                    <input {...register('billingStreetAddress')} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <p className="text-red-600 text-sm">{errors.billingStreetAddress?.message}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Billing Zipcode</label>
                    <input {...register('billingZipcode')} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <p className="text-red-600 text-sm">{errors.billingZipcode?.message}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Billing City</label>
                    <input {...register('billingCity')} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <p className="text-red-600 text-sm">{errors.billingCity?.message}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Billing State</label>
                    <input {...register('billingState')} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <p className="text-red-600 text-sm">{errors.billingState?.message}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Billing Country</label>
                    <input {...register('billingCountry')} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <p className="text-red-600 text-sm">{errors.billingCountry?.message}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Shop Name</label>
                    <input {...register('shopName')} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <p className="text-red-600 text-sm">{errors.shopName?.message}</p>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">Complete Profile</button>
            </form>
        </div>
    );
};

export default CompleteProfile;


