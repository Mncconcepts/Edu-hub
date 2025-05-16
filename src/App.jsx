import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Login from "./components/navbar/Login";
import Signup from "./components/navbar/Signup";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/navbar/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import News from "./components/navbar/News";
import SingleNews from "./components/navbar/SingleNews";
import Loader from "./components/navbar/Loader";

const Home = () => <h1></h1>;

const PageLoader = ({ children, setLoading }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  const isAuthPage = location.pathname === "/signup" || location.pathname === "/login";

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/signup" || location.pathname === "/login") {
      navigate("/home", { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    setLoading(true);
    setShowContent(false);

    const timer = setTimeout(() => {
      setLoading(false);
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location, setLoading]);

  return showContent ? children : null;
};

const ScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    const navType = performance.getEntriesByType("navigation")[0]?.type;

    if (navType === "back_forward") {
      const savedPosition = sessionStorage.getItem(`scroll-${location.key}`);
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition, 10));
      }
    } else {
      window.scrollTo(0, 0);
    }

    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${location.key}`, window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  return null;
};

const AppContent = ({ user, handleLogin }) => {
  const location = useLocation();

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/news" element={<News />} />
        <Route path="/singlenews/:id" element={<SingleNews />} />
      </Routes>
      <div className="main-container">
        <div className="content">
          <Outlet />
        </div>
        {!location.pathname.startsWith("/dashboard") && <Footer />}
      </div>
    </>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const handleLogin = (profile) => {
    setUser(profile);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: true,
    });
  }, []);

  return (
    <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
      <ScrollRestoration />
      {loading && <Loader />}
      <PageLoader setLoading={setLoading}>
        <AppContent user={user} handleLogin={handleLogin} />
      </PageLoader>
    </div>
  );
};

export default App;
