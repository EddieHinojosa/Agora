import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../utils/firebaseConfig';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profileIncomplete, setProfileIncomplete] = useState(false);
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
                        navigate('/login/usersignup', {
                            state: {
                                email: response.data.email,
                                name: response.data.name,
                                token,
                            }
                        });
                    } else {
                        setUser(response.data.user);
                        localStorage.setItem('token', token);
                        setProfileIncomplete(false);
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
        await signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();
            const response = await axios.post(`${apiUrl}/api/auth/firebase-login`, { token });

            if (response.data.profileIncomplete) {
                navigate('/login/usersignup', {
                    state: {
                        email: response.data.email,
                        name: response.data.name,
                        token,
                    }
                });
            } else {
                setUser(response.data.user);
                localStorage.setItem('token', token);
                setProfileIncomplete(false);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const completeRegistration = async (data, token) => {
        try {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const endpoint = token ? `${apiUrl}/api/auth/complete-registration` : `${apiUrl}/api/auth/register`;
    
            const response = await axios.post(endpoint, data, { headers });
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
        <AuthContext.Provider value={{ user, profileIncomplete, login, googleLogin, completeRegistration, updateProfile, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
































