// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { auth } from '../utils/firebaseConfig';
// import { onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';

// const FirebaseAuthContext = createContext();

// const FirebaseAuthProvider = ({ children }) => {
//   const [firebaseUser, setFirebaseUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const token = await user.getIdToken();
//         const response = await axios.post(`${import.meta.env.VITE_DEV_API_URL}/api/firebase-auth/firebase-login`, { token });
//         setFirebaseUser(response.data.user);
//       } else {
//         setFirebaseUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const firebaseLogin = async (email, password) => {
//     await signInWithEmailAndPassword(auth, email, password);
//   };

//   const firebaseLogout = async () => {
//     await firebaseSignOut(auth);
//     setFirebaseUser(null);
//   };

//   return (
//     <FirebaseAuthContext.Provider value={{ firebaseUser, firebaseLogin, firebaseLogout }}>
//       {children}
//     </FirebaseAuthContext.Provider>
//   );
// };

// export { FirebaseAuthContext, FirebaseAuthProvider };
