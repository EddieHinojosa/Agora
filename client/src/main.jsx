import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import LoginApp from './LoginApp.jsx';
import ShopApp from './ShopApp.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';

console.log(import.meta.env);

const apiUrl = import.meta.env.VITE_API_URL;
console.log('API URL:', apiUrl);

console.log('Client environment variables:', {
  VITE_DEV_API_URL: import.meta.env.VITE_DEV_API_URL,
  VITE_PROD_API_URL: import.meta.env.VITE_PROD_API_URL,
  VITE_GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  VITE_GOOGLE_CLIENT_SECRET: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
  VITE_JWT_SECRET: import.meta.env.VITE_JWT_SECRET,
});

// Error page
import Error from './pages/Error.jsx';

// Home-Main Pages
import Home from './pages/Home.jsx';
import User from './pages/User.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx'
import UpdateProfile from './pages/UpdateProfile.jsx';

// Login-Signup Pages
import Login from './pages/login/Login.jsx';
import ShopSignup from './pages/login/ShopSignup.jsx';
import UserSignup from './pages/login/UserSignup.jsx';

// Shop Manager Pages
import ShopManager from './pages/shop-manager/ShopManager.jsx';
import Orders from './pages/shop-manager/Orders.jsx';
import Messages from './pages/shop-manager/Messages.jsx';
import Products from './pages/shop-manager/Products.jsx';
import NewProduct from './pages/shop-manager/NewProduct.jsx';
import Calendar from './pages/shop-manager/Calendar.jsx';
import Settings from './pages/shop-manager/Settings.jsx';
import Finances from './pages/shop-manager/Finances.jsx';

console.log('Client environment variables:', import.meta.env);


const router = createBrowserRouter([
  // Home-Main Pages
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'user',
        element: <User />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'update-profile',
        element: <UpdateProfile />
      }
    ]
  },

  // Login-Signup Pages
  {
    path: 'login',
    element: <LoginApp />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'usersignup',
        element: <UserSignup />
      },
      {
        path: 'shopsignup',
        element: <ShopSignup />
      }
    ]
  },

  // Shop Manager Pages
  {
    path: 'shopmanager',
    element: <ShopApp />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <ShopManager />
      },
      {
        path: 'orders',
        element: <Orders />
      },
      {
        path: 'messages',
        element: <Messages />
      }, 
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'newproduct',
        element: <NewProduct />
      },
      {
        path: 'finances',
        element: <Finances />
      },
      {
        path: 'calendar',
        element: <Calendar />
      },
      {
        path: 'settings',
        element: <Settings />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

