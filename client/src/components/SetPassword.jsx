import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const schema = yup.object().shape({
    newPassword: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

const SetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState('');

    const onSubmit = async (data) => {
        try {
            const token = await user.getIdToken();
            await axios.post('/api/set-password', {
                token,
                newPassword: data.newPassword,
            });
            setMessage('Password set successfully');
        } catch (error) {
            setMessage('Failed to set password: ' + error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 mt-10 shadow-md rounded">
            <h1 className="text-2xl font-bold mb-6 text-center">Set Password</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input type="password" {...register('newPassword')} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <p className="text-red-600 text-sm">{errors.newPassword?.message}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password" {...register('confirmPassword')} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <p className="text-red-600 text-sm">{errors.confirmPassword?.message}</p>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">Set Password</button>
                {message && <p className="text-center mt-4 text-red-600">{message}</p>}
            </form>
        </div>
    );
};

export default SetPassword;