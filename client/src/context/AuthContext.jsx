import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../utils/firebaseConfig';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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
                    localStorage.setItem('token', response.data.jwt);
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

    const googleLogin = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, googleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;


























