import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../utils/firebaseConfig';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const apiUrl = import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_PROD_API_URL
        : import.meta.env.VITE_DEV_API_URL;

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const token = await firebaseUser.getIdToken();
                    const response = await axios.post(`${apiUrl}/api/auth/firebase-login`, { token });
                    if (response.data.profileIncomplete) {
                        setProfileIncomplete(true);
                        setIsRegistering(true); // Set registering to true
                    } else {
                        setUser(response.data.user);
                        setProfileIncomplete(false);
                        localStorage.setItem('token', token);
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, [apiUrl, navigate]);

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error during login:", error);
            throw new Error('Login failed. Please check your email and password.');
        }
    };

    const googleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            alert(error.message);
        }
    };

    const completeRegistration = async (data, token) => {
        try {
            const response = await axios.post(`${apiUrl}/api/auth/complete-registration`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data.user);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data.message === 'Email already in use') {
                alert('Registration failed: Email already in use');
            } else {
                alert('Registration failed: ' + error.message);
            }
        }
    };

    const updateProfile = async (data) => {
        const token = localStorage.getItem('token');
        await axios.post(`${apiUrl}/api/update-profile`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUser({ ...user, ...data });
    };

    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, googleLogin, completeRegistration, updateProfile, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
































