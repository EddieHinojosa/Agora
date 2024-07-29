// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

console.log('API Key:', import.meta.env.VITE_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { auth, db };


// // Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

// // TODO: Add SDKs for Firebase products that you want to use

// // https://firebase.google.com/docs/web/setup#available-libraries


// // Your web app's Firebase configuration

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {

//   apiKey: "AIzaSyAO47eDgNmNplTh-7G5r8i8jCHtkj1dJZY",

//   authDomain: "agora-df482.firebaseapp.com",

//   projectId: "agora-df482",

//   storageBucket: "agora-df482.appspot.com",

//   messagingSenderId: "712969303843",

//   appId: "1:712969303843:web:4d9deaa4708823d3ccfe96",

//   measurementId: "G-MBHZQJX0X2"

// };


// // Initialize Firebase

// const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);