// import React, { useContext, useState } from 'react';
// import { FirebaseAuthContext } from '../context/FirebaseAuthContext';
// import { useNavigate } from 'react-router-dom';

// const FirebaseLogin = () => {
//   const { loginWithGoogle, loginWithEmail } = useContext(FirebaseAuthContext);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleEmailLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await loginWithEmail(email, password);
//       navigate('/');
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Firebase Login</h2>
//       <form onSubmit={handleEmailLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login with Email</button>
//       </form>
//       <button onClick={loginWithGoogle}>Login with Google</button>
//     </div>
//   );
// };

// export default FirebaseLogin;