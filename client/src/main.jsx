import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import LoginApp from './LoginApp.jsx';
import ShopApp from './ShopApp.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';


// Error page
import Error from './pages/Error.jsx';

// Home-Main Pages
import Home from './pages/main/Home.jsx';
import User from './pages/login/User.jsx';
import Cart from './pages/main/Cart.jsx';
import UpdateProfile from './pages/main/UpdateProfile.jsx';
import Shops from './pages/main/Shops.jsx';
import ProductDetails from './pages/main/Details.jsx'
import Categories from './pages/main/Categories.jsx';
import Results from './pages/main/Results.jsx'

// Login-Signup Pages
import Login from './pages/login/Login.jsx';
import UserSignup from './pages/login/UserSignup.jsx';
import ForgotPassword from './pages/login/ForgotPassword.jsx';
import ResetPassword from './pages/login/ResetPassword.jsx';

// Shop Manager Pages
import ShopManager from './pages/shop-manager/ShopManager.jsx';
import Orders from './pages/shop-manager/Orders.jsx';
import Messages from './pages/shop-manager/Messages.jsx';
import Products from './pages/shop-manager/Products.jsx';
import NewProduct from './pages/shop-manager/NewProduct.jsx';
import Calendar from './pages/shop-manager/Calendar.jsx';
import Settings from './pages/shop-manager/Settings.jsx';
import Finances from './pages/shop-manager/Finances.jsx';
import EditProduct from './pages/shop-manager/EditProduct.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="user" element={<User />} />
              <Route path="cart" element={<Cart />} />
              <Route path="update-profile" element={<UpdateProfile />} />
              <Route path="shop/:slug" element={<Shops />} />
              <Route path="details/:id" element={<ProductDetails />} />
              <Route path="/categories/:category" element={<Categories />} />
              <Route path="/results" element={<Results />} />
            </Route>

            {/* Login-Signup Pages */}
            <Route path="login" element={<LoginApp />}>
              <Route index element={<Login />} />
              <Route path="usersignup" element={<UserSignup />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>


            {/* Shop Manager Pages */}
            <Route path="shopmanager/:id" element={<ShopApp />}>
              <Route index element={<ShopManager />} />
              <Route path="orders" element={<Orders />} />
              <Route path="messages" element={<Messages />} />
              <Route path="products" element={<Products />} />
              <Route path="newproduct" element={<NewProduct />} />
              <Route path="editproduct/:id" element={<EditProduct />} />
              <Route path="finances" element={<Finances />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<Error />} />
          </Routes>
        </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

