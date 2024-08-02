// import express from 'express';
// import admin from 'firebase-admin';
// import User from '../models/User.js';
// import jwt from 'jsonwebtoken';

// const router = express.Router();

// // Middleware to verify Firebase ID Token
// const firebaseAuthenticate = async (req, res, next) => {
//   const idToken = req.headers.authorization?.split('Bearer ')[1];

//   if (!idToken) {
//     return res.status(401).json({ message: 'Unauthorized: No token provided' });
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     res.status(401).json({ message: 'Unauthorized: Invalid token' });
//   }
// };

// // Firebase login
// router.post('/firebase-login', async (req, res) => {
//   const { token } = req.body;

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     const { uid, email } = decodedToken;

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = new User({
//         email,
//         firebaseId: uid,
//         firstName: '',
//         lastName: '',
//       });
//       await user.save();
//     }

//     const jwtToken = jwt.sign({ userId: user._id }, process.env.VITE_SESSION_SECRET, { expiresIn: '1h' });
//     res.json({ token: jwtToken, user });
//   } catch (error) {
//     console.error('Error during Firebase login:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// });

// export { firebaseAuthenticate };
// export default router;