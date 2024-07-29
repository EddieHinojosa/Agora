import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    username: yup.string().required('Username is required'),
});

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { login, googleLogin, setUsernameAndPassword, user } = useContext(AuthContext);
    const navigate = useNavigate(); // Ensure navigate is defined here
    const [isUsernameAndPassword, setIsUsernameAndPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            alert('Login successful');
            navigate('/');
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin(navigate); // Pass navigate function
            if (!user.username) {
                setIsUsernameAndPassword(true);
            } else {
                navigate('/');
            }
        } catch (error) {
            alert('Google login failed: ' + error.message);
        }
    };

    const handleUsernameAndPassword = async (data) => {
        try {
            await setUsernameAndPassword(data.username, data.password);
            alert('Username and password set successfully');
            navigate('/');
        } catch (error) {
            alert('Failed to set username and password: ' + error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 mt-10 shadow-md rounded">
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
            <form onSubmit={handleSubmit(isUsernameAndPassword ? handleUsernameAndPassword : onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input {...register('email')} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <p className="text-red-600 text-sm">{errors.email?.message}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" {...register('password')} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <p className="text-red-600 text-sm">{errors.password?.message}</p>
                </div>
                {isUsernameAndPassword && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input type="password" {...register('confirmPassword')} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            <p className="text-red-600 text-sm">{errors.confirmPassword?.message}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input {...register('username')} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            <p className="text-red-600 text-sm">{errors.username?.message}</p>
                        </div>
                    </>
                )}
                <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">
                    {isUsernameAndPassword ? 'Set Username and Password' : 'Login'}
                </button>
                <button type="button" onClick={handleGoogleLogin} className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700 mt-2">Login with Google</button>
                <p className="text-center text-sm text-gray-600 mt-4">Don't have an account? <Link to="/login/usersignup" className="text-indigo-600 hover:underline">User Signup</Link> or <Link to="/login/shopsignup" className="text-indigo-600 hover:underline">Shop Signup</Link></p>
            </form>
        </div>
    );
};

export default Login;













