import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import LoginApp from './LoginApp.jsx';
import ShopApp from './ShopApp.jsx';
import './index.css';
import { AuthProvider, AuthContext } from './context/AuthContext.jsx';
// import { FirebaseAuthProvider, FirebaseAuthContext } from './context/FirebaseAuthContext.jsx';

// Error page
import Error from './pages/Error.jsx';

// Home-Main Pages
import Home from './pages/Home.jsx';
import User from './pages/User.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import UpdateProfile from './pages/UpdateProfile.jsx';
import Shops from './pages/Shops.jsx';

// Login-Signup Pages
import Login from './pages/login/Login.jsx';
import ShopSignup from './pages/login/ShopSignup.jsx';
import UserSignup from './pages/login/UserSignup.jsx';
import ForgotPassword from './pages/login/ForgotPassword.jsx';
import ResetPassword from './pages/login/ResetPassword.jsx';
// import FirebaseLogin from './pages/login/FirebaseLogin.jsx';

// Shop Manager Pages
import ShopManager from './pages/shop-manager/ShopManager.jsx';
import Orders from './pages/shop-manager/Orders.jsx';
// import Messages from './pages/shop-manager/Messages.jsx';
import Products from './pages/shop-manager/Products.jsx';
import NewProduct from './pages/shop-manager/NewProduct.jsx';
import Calendar from './pages/shop-manager/Calendar.jsx';
import Settings from './pages/shop-manager/Settings.jsx';
import Finances from './pages/shop-manager/Finances.jsx';
// import NewMessage from './pages/shop-manager/NewMessage.jsx';
import EditProduct from './pages/shop-manager/EditProduct.jsx';

const ProtectedRoute = ({ element }) => {
  const { user: regularUser } = useContext(AuthContext);
  // const { user: firebaseUser } = useContext(FirebaseAuthContext);
  return regularUser ? element : <Navigate to="/login" />;
};
// const FirebaseProtectedRoute = ({ element }) => {
//   const { firebaseUser } = useContext(FirebaseAuthContext);
//   return firebaseUser ? element : <Navigate to="/firebase-login" />;
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* <FirebaseAuthProvider> */}
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="user" element={<User />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="update-profile" element={<UpdateProfile />} />
              <Route path="shop/:slug" element={<Shops />} />
            </Route>

            {/* Login-Signup Pages */}
            <Route path="login" element={<LoginApp />}>
              <Route index element={<Login />} />
              <Route path="usersignup" element={<UserSignup />} />
              <Route path="shopsignup" element={<ShopSignup />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>

            {/* <Route path="firebase-login" element={<FirebaseLogin />} /> */}

            {/* Protected Shop Manager Pages */}
            <Route path="shopmanager/user/:id" element={<ShopApp />}>
              <Route index element={<ShopManager />} />
              <Route path="orders" element={<Orders />} />
              {/* <Route path="messages" element={<Messages />} />
              <Route path="newmessage" element={<NewMessage />} /> */}
              <Route path="products" element={<Products />} />
              <Route path="newproduct" element={<NewProduct />} />
              <Route path="editproduct/:productid" element={<EditProduct />} />
              <Route path="finances" element={<Finances />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Firebase Protected Shop Manager Pages
            <Route path="firebase-shopmanager" element={<FirebaseProtectedRoute element={<ShopApp />} />}>
              <Route index element={<ShopManager />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route path="newproduct" element={<NewProduct />} />
              <Route path="editproduct/:id" element={<EditProduct />} />
              <Route path="finances" element={<Finances />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="settings" element={<Settings />} />
            </Route> */}

            <Route path="*" element={<Error />} />
          </Routes>
        {/* </FirebaseAuthProvider> */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

