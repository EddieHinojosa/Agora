import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import LoginApp from './LoginApp.jsx';
import ShopApp from './ShopApp.jsx';
import "./index.css";

import Error from "./pages/Error.jsx";

import Home from "./pages/Home.jsx";
import User from "./pages/User.jsx";
import Cart from "./pages/Cart.jsx";

import Login from "./pages/login/Login.jsx";
import ShopSignup from "./pages/login/ShopSignup.jsx";
import UserSignup from "./pages/login/UserSignup.jsx";

import ShopManager from "./pages/shop-manager/ShopManager.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
      }
    ],
    errorElement: <Error />
  },
  {
    path: 'login/*',
    element: <LoginApp />,
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
    ], 
    errorElement: <Error />
  },
  {
    path: 'shopmanager/*',
    element: <ShopApp />,
    children: [
      {
        index: true,
        element: <ShopManager />
      }
    ], 
    errorElement: <Error />
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
