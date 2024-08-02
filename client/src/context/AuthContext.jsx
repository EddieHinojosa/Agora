import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../utils/firebaseConfig';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [signupMessage, setSignupMessage] = useState('');
    const apiUrl = import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_PROD_API_URL
        : import.meta.env.VITE_DEV_API_URL;

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const token = await firebaseUser.getIdToken();
                    setToken(token);
                    const response = await axios.post(`${apiUrl}/api/firebase-login`, { token });
                    setUser(response.data.user);
                    localStorage.setItem('token', token);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, [apiUrl]);

    const regularLogin = async (email, password) => {
        try {
            const response = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
            setToken(response.data.token);
            const userResponse = await axios.get(`${apiUrl}/api/auth/me`, {
                headers: {
                    Authorization: `Bearer ${response.data.token}`
                }
            });
            setUser(userResponse.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error("Error during login:", error);
            if (error.response) {
                console.error("Backend error message:", error.response.data.message);
                throw new Error(error.response.data.message);
            } else {
                console.error("General error message:", error.message);
                throw new Error('Login failed. Please check your email and password.');
            }
        }
    };

    const regularRegister = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/api/auth/register`, data);
            setToken(response.data.token);
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            console.error("Error during registration:", error);
            throw new Error('Registration failed: ' + error.message);
        }
    };

    const firebaseRegister = async (data, token) => {
        try {
            const response = await axios.post(`${apiUrl}/api/firebase-register`, { ...data, token });
            setUser(response.data.user);
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            console.error("Error during Firebase registration:", error);
            throw new Error('Firebase registration failed: ' + error.message);
        }
    };

    const firebaseLogin = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error during Firebase login:", error);
            throw new Error('Firebase login failed. Please check your email and password.');
        }
    };

    const googleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };

    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, regularLogin, regularRegister, firebaseLogin, firebaseRegister, googleLogin, logout, signupMessage, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
































