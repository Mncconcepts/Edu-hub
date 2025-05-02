import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

// Pages & Components
import Login from './components/navbar/Login.jsx';
import Signup from './components/navbar/Signup.jsx';
import Home from './home/Home.jsx';
import About from './about/About.jsx';
import About2 from './about/About2.jsx';
import About3 from './about/About3.jsx';
import Reviews from './components/navbar/Reviews.jsx';
import Footer from './components/navbar/Footer.jsx';
import Acalender from './components/navbar/Acalender.jsx';
import Gradmat from './components/navbar/Gradmat.jsx';
import Program from './components/navbar/Program.jsx';
import Admission from './components/navbar/Admission.jsx';
import Contact from './contact/Contact.jsx';
import News from './components/navbar/News.jsx';
import SingleNews from './components/navbar/SingleNews.jsx';
import News2 from './components/navbar/News2.jsx';
import News3 from './components/navbar/News3.jsx';
import Course from './components/navbar/Course.jsx';
import Loader from './components/navbar/Loader.jsx';
import Shop from './components/navbar/Shop.jsx';
import Cart from './components/navbar/Cart.jsx';
import Wishlist from './components/navbar/Wishlist.jsx';
import ForgotPassword from './components/navbar/ForgotPassword.jsx';
import CheckOut from './components/navbar/CheckOut.jsx';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/about2", element: <About2 /> },
      { path: "/about3", element: <About3 /> },
      { path: "/reviews", element: <Reviews /> },
      { path: "/footer", element: <Footer /> },
      { path: "/acalender", element: <Acalender /> },
      { path: "/gradmat", element: <Gradmat /> },
      { path: "/program", element: <Program /> },
      { path: "/admission", element: <Admission /> },
      { path: "/contact", element: <Contact /> },
      { path: "/news1", element: <News /> },
      { path: "/singlenews", element: <SingleNews /> },
      { path: "/news2", element: <News2 /> },
      { path: "/news3", element: <News3 /> },
      { path: "/course", element: <Course /> },
      { path: "/loader", element: <Loader /> },
      { path: "/shop", element: <Shop /> },
      { path: "/cart", element: <Cart /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/checkout", element: <CheckOut /> }

    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgotpassword", element: <ForgotPassword /> }
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
