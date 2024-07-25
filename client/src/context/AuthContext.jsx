import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:5000/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                console.log("Profile response:", response);
                setUser(response.data.user);
            }).catch(error => {
                console.error("Error fetching profile:", error);
                setUser(null);
            });
        }
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            axios.get('http://localhost:5000/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                console.log("Profile response with token:", response);
                setUser(response.data.user);
                window.history.replaceState(null, '', '/'); // Remove the token from the URL
            }).catch(error => {
                console.error("Error fetching profile with token:", error);
                setUser(null);
            });
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('token', userData.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;



















