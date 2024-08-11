import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import FormField from '../../components/FormField';
import SelectField from '../../components/SelectField';

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
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
    username: yup.string().required('Username is required'),
    shopName: yup.string().required('Shop Name is required'),
});

const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
    "New Hampshire", "New Jersey", "New Mexico", "New York", 
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
    "West Virginia", "Wisconsin", "Wyoming"
];
const countries = ["United States"]; 

const UpdateProfile = () => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { user, updateProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const apiUrl = import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_PROD_API_URL
        : import.meta.env.VITE_DEV_API_URL;

    useEffect(() => {
        if (user) {
            setValue('firstName', user.firstName);
            setValue('lastName', user.lastName);
            setValue('email', user.email);
            setValue('billingStreetAddress', user.billingAddress?.streetAddress || '');
            setValue('billingZipcode', user.billingAddress?.zipcode || '');
            setValue('billingCity', user.billingAddress?.city || '');
            setValue('billingState', user.billingAddress?.state || '');
            setValue('billingCountry', user.billingAddress?.country || '');
            setValue('mailingStreetAddress', user.mailingAddress?.streetAddress || '');
            setValue('mailingZipcode', user.mailingAddress?.zipcode || '');
            setValue('mailingCity', user.mailingAddress?.city || '');
            setValue('mailingState', user.mailingAddress?.state || '');
            setValue('mailingCountry', user.mailingAddress?.country || '');
            setValue('username', user.username);
            setValue('shopName', user.shopName);
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${apiUrl}/api/update-profile`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            updateProfile({ ...user, ...data });
            alert('Profile updated successfully');
            navigate('/shopmanager');
        } catch (error) {
            if (error.response) {
                alert('Profile update failed: ' + error.response.data.message);
            } else {
                alert('Profile update failed: ' + error.message);
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
            <h1 className="text-2xl font-bold mb-6 text-center">Update Your Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormField label="First Name" name="firstName" register={register} errors={errors} />
                <FormField label="Last Name" name="lastName" register={register} errors={errors} />
                <FormField label="Email" name="email" register={register} errors={errors} disabled={true} />
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
                
                <FormField label="Username" name="username" register={register} errors={errors} disabled={true} />
                <FormField label="Shop Name" name="shopName" register={register} errors={errors} />
                
                <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">Update Profile</button>
            </form>
        </div>
    );
};

export default UpdateProfile;







