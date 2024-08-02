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
import Home from './pages/Home.jsx';
import User from './pages/User.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import UpdateProfile from './pages/UpdateProfile.jsx';

// Login-Signup Pages
import Login from './pages/login/Login.jsx';
import ShopSignup from './pages/login/ShopSignup.jsx';
import UserSignup from './pages/login/UserSignup.jsx';

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
  const { user } = useContext(AuthContext);
  return user ? element : <Navigate to="/login" />;
};

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
            <Route path="checkout" element={<Checkout />} />
            <Route path="update-profile" element={<UpdateProfile />} />
          </Route>

          {/* Login-Signup Pages */}
          <Route path="login" element={<LoginApp />}>
            <Route index element={<Login />} />
            <Route path="usersignup" element={<UserSignup />} />
            <Route path="shopsignup" element={<ShopSignup />} />
          </Route>

          {/* Protected Shop Manager Pages */}
          <Route path="shopmanager" element={<ProtectedRoute element={<ShopApp />} />}>
            <Route index element={<ShopManager />} />
            <Route path="orders" element={<Orders />} />
            {/* <Route path="messages" element={<Messages />} />
            <Route path="newmessage" element={<NewMessage />} /> */}
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

