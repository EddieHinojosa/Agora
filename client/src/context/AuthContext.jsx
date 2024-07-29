import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../pages/utils/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const apiUrl = import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_PROD_API_URL
        : import.meta.env.VITE_DEV_API_URL;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const token = await firebaseUser.getIdToken();
                    const response = await axios.post(`${apiUrl}/api/auth/firebase-login`, { token });
                    setUser(response.data.user);
                    localStorage.setItem('token', response.data.token);
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

    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = async (navigate) => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const firebaseUser = result.user;

            if (firebaseUser) {
                const token = await firebaseUser.getIdToken();
                const response = await axios.post(`${apiUrl}/api/auth/firebase-login`, { token });

                setUser(response.data.user);
                localStorage.setItem('token', response.data.token);

                if (!response.data.user.profileCompleted) {
                    navigate('/complete-profile');
                } else {
                    navigate('/');
                }
            } else {
                throw new Error("Google login failed: user is null");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const registerUser = async (data, navigate) => {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;

        await axios.post(`${apiUrl}/api/auth/register`, {
            uid: user.uid,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            billingAddress: {
                street: data.billingStreetAddress,
                city: data.billingCity,
                state: data.billingState,
                zip: data.billingZipcode,
                country: data.billingCountry,
            },
            mailingAddress: {
                street: data.mailingStreetAddress,
                city: data.mailingCity,
                state: data.mailingState,
                zip: data.mailingZipcode,
                country: data.mailingCountry,
            },
            username: data.username,
            shopName: data.shopName,
        });
        navigate('/'); // Navigate after successful registration
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

    const logout = async (navigate) => {
        await signOut(auth);
        localStorage.removeItem('token');
        setUser(null);
        navigate('/'); // Navigate to the home page upon logout
    };

    return (
        <AuthContext.Provider value={{ user, login, googleLogin, registerUser, updateProfile, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

































