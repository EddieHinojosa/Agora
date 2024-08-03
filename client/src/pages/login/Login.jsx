import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import FormField from '../../components/FormField';
import { AuthContext } from '../../context/AuthContext';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const { regularLogin } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [loginError, setLoginError] = useState('');

  const onSubmit = async (data) => {
    try {
      await regularLogin(data.email, data.password);
      console.log('User logged in');  // Debugging
    } catch (error) {
      console.log('Login error:', error);  // Debugging
      setLoginError('Login failed: ' + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-10 shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      {loginError && <p className="text-red-600 text-sm text-center">{loginError}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="Email" name="email" register={register} errors={errors} />
        <FormField label="Password" name="password" register={register} errors={errors} type="password" />
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">
          Login
        </button>
      </form>
      <Link to="/forgot-password">Forgot Password?</Link>
    </div>
  );
};

export default Login;
















