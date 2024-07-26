import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const apiUrl = process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_PROD_API_URL
        : process.env.REACT_APP_DEV_API_URL;

    useEffect(() => {
        const fetchProfile = async (token) => {
            try {
                const response = await axios.get(`${apiUrl}/api/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data.user);
                console.log('Profile response:', response);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setUser(null);
            }
        };

        const token = localStorage.getItem('token');
        if (token) {
            fetchProfile(token);
        }

        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');
        if (tokenFromUrl) {
            localStorage.setItem('token', tokenFromUrl);
            fetchProfile(tokenFromUrl);
            window.history.replaceState(null, '', '/'); // Remove the token from the URL
        }
    }, [apiUrl]);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('token', userData.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    const updateProfile = (updatedUserData) => {
        setUser(updatedUserData);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;






















