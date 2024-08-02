import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../utils/firebaseConfig';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FirebaseAuthContext = createContext();

const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
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
          const response = await axios.post(`${apiUrl}/api/firebase-auth/firebase-login`, { token });
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

    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const user = result.user;
          user.getIdToken().then((token) => {
            setToken(token);
            axios.post(`${apiUrl}/api/firebase-auth/firebase-login`, { token })
              .then((response) => {
                if (response.data.profileIncomplete) {
                  navigate('/login/usersignup', {
                    state: {
                      email: response.data.email,
                      name: response.data.name,
                      token,
                      signupMessage: 'You need to create an account by signing up.'
                    }
                  });
                } else {
                  setUser(response.data.user);
                  localStorage.setItem('token', token);
                }
              }).catch((error) => {
                console.error("Error fetching user profile:", error);
                setUser(null);
              });
          });
        }
      }).catch((error) => {
        console.error("Error getting redirect result:", error);
      });

    return () => unsubscribe();
  }, [apiUrl, navigate]);

  const firebaseLogin = async (email, password) => {
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
    <FirebaseAuthContext.Provider value={{ user, firebaseLogin, googleLogin, logout, token }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export { FirebaseAuthContext, FirebaseAuthProvider };
