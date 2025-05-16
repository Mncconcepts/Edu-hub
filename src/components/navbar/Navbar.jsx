import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhoneAlt, faEnvelope, faBars, faTimes, faChevronDown,
    faSearch, faChevronRight, faShoppingCart,
    faHeart,
    faGripLines
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

const Navbar = () => {
    const location = useLocation();
    const [dropdown, setDropdown] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showTopNav, setShowTopNav] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showNotification, setShowNotification] = useState(false);


    useEffect(() => {
        fetch('/product.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const updateCounts = () => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
        const totalCartItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

        setCartCount(totalCartItems);
        setWishlistCount(wishlistItems.length);
    };

    useEffect(() => {
        if (searchTerm) {
            const result = products.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFiltered(result);
        } else {
            setFiltered([]);
        }
    }, [searchTerm, products]);


    const toggleDropdown = (menu) => {
        setDropdown(dropdown === menu ? null : menu);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleTopNav = () => {
        setShowTopNav(!showTopNav);
    };

    useEffect(() => {
        setMenuOpen(false);
        setDropdown(null);
        setShowTopNav(false);
    }, [location]);

    const handleNavClick = () => {
        setMenuOpen(false);
        setDropdown(null);
        setShowTopNav(false);
    };

    useEffect(() => {
        updateCounts();

        window.addEventListener("storage", updateCounts);

        return () => {
            window.removeEventListener("storage", updateCounts);
        };
    }, []);

    useEffect(() => {
        const updateCartCount = () => {
            const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
            setCartCount(cartItems.length);
        };
        updateCartCount();
        const interval = setInterval(updateCartCount, 1000);
        return () => clearInterval(interval);
    }, []);


    useEffect(() => {

        // Initial load
        updateCounts();

        // Listen for updates from other components
        window.addEventListener("wishlistUpdated", updateCounts);
        window.addEventListener("storage", updateCounts);

        return () => {
            window.removeEventListener("wishlistUpdated", updateCounts);
            window.removeEventListener("storage", updateCounts);
        };
    }, []);


    const dropdowns = document.querySelectorAll('.dropdown');
    const handleDropdownClick = (e) => {
        e.stopPropagation();
        e.currentTarget.classList.toggle('open');

        dropdowns.forEach(otherDrop => {
            if (otherDrop !== e.currentTarget) {
                otherDrop.classList.remove('open');
            }
        });
    };

    dropdowns.forEach(drop => {
        drop.addEventListener('click', handleDropdownClick);
    });

    const handleDocumentClick = () => {
        dropdowns.forEach(drop => drop.classList.remove('open'));
    };

    document.addEventListener('click', handleDocumentClick);


    return (
        <>
            {showNotification && (
                <div className="notification-bar">
                    Product added to cart!
                </div>
            )}

            {/* Top Navbar */}
            <div className={`top-navbar ${showTopNav ? "show" : ""}`}>
                <div className="contact-info">
                    <FontAwesomeIcon icon={faPhoneAlt} className="icon" /> +234 913 3194 835
                </div>
                <div className="email-info">
                    <FontAwesomeIcon icon={faEnvelope} className="icon" /> info@project-edu.gh
                </div>
                <Link to="/admission">
                    <button className="applyy-btn">Apply Now</button>
                </Link>
            </div>

            {/* Toggle Icon for Top Navbar */}
            <button className="top-navbar-toggle" onClick={toggleTopNav}>
                <FontAwesomeIcon icon={showTopNav ? faTimes : faGripLines} />
            </button>

            {/* Main Navbar */}
            <nav className="main-navbar">
                <div className="logo">
                    <img src="/logo.png" alt="Logo" />
                </div>

                <div className="nav-icons-group">

                    <div className="icon-with-badge">
                        <Link to="/wishlist">
                            <FontAwesomeIcon icon={faHeart} className="nav-iconz" />
                            <span className="badge">{wishlistCount}</span>
                        </Link>
                    </div>

                    <div className="icon-with-badge">
                        <Link to="/cart">
                            <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                            <span className="badgee">{cartCount}</span>
                        </Link>
                    </div>

                    <div className="nav-icons" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                    </div>
                </div>


                <ul className="nav-links">
                    <li><a href="#home" onClick={handleNavClick}>Home</a></li>
                    <li><a href="#about" onClick={handleNavClick}>About</a></li>
                    <li className="dropdown">
                        <a href="#">Academics</a>
                        <ul className="dropdown-menu">
                            <li><a href="#acalender">Academic Calendar</a></li>
                            <li><a href="#gradmat">Grad & Matriculation</a></li>
                            <li><a href="#program">Programmes</a></li>

                            <li className="dropdown-submenu">
                                <a href="#">Faculties</a>
                                <ul className="submenu">
                                    <li><a href="#science">Faculty of Science</a></li>
                                    <li><a href="#business">Faculty of Business</a></li>
                                    <li><a href="#arts">Faculty of Arts</a></li>
                                    <li><a href="#it">Faculty of IT</a></li>
                                </ul>
                            </li>

                            <li><a href="#course">Certificate Courses</a></li>
                            <li><a href="#">Src</a></li>
                            <li className="dropdown-submenu">
                                <a href="#">Events</a>
                                <ul className="submenu">
                                    <li><a href="#science">Events List</a></li>
                                    <li><a href="#business">Events Countdown</a></li>
                                </ul>
                            </li>
                            <li className="dropdown-submenu">
                                <a href="#">Media</a>
                                <ul className="submenu">
                                    <li><a href="#science">Gallery</a></li>
                                    <li><a href="#business">Image Text Bool 2</a></li>
                                    <li><a href="#business">Video</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Refferals</a></li>
                        </ul>
                    </li>

                    <li><a href="#admission">Admissions</a></li>

                    <li className="dropdown">
                        <a href="#">
                            Library
                        </a>
                        <ul className="dropdown-menu">
                            <li className="dropdown-submenu">
                                <a href="#">Media</a>
                                <ul className="submenu">
                                    <li><a href="#science">E-Journal</a></li>
                                    <li><a href="#business">Publication</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li><a href="#contact">Contact</a></li>

                    <li className="dropdown">
                        <a href="#">
                            News
                        </a>
                        <ul className="dropdown-menu">
                            <li><a href="#news1">WEUC News</a></li>
                            <li><a href="#news3">WEUC Events</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>

            {/* Mobile Menu for Large Screens */}
            <div className={`mobile-menu large-screen ${menuOpen ? "active" : ""}`}>
                <button className="close-menu" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <ul>
                    <li><a href="#gradmat">* Graduation</a></li>
                    <li><a href="#admission">* Admission</a></li>
                    <li><a href="#">* Student Portal</a></li>
                    <li><a href="#">* WEUC LMS</a></li>
                    <li><a href="#">* Staff Portal</a></li>
                    <li><a href="#signup">* Email Login</a></li>
                    <li><a href="#">* Alumni</a></li>
                    <li><a href="#">* Referrals</a></li>
                    <li><a href="#">* Webinar</a></li>
                    <li><a href="#">* FAQs</a></li>
                </ul>
            </div>

            {/* Mobile Menu for Small Screens */}
            <div className={`mobile-menu small-screen ${menuOpen ? "active" : ""}`}>
                <button className="close-menu" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <ul>
                    <li><a href="#home" onClick={handleNavClick}>HOME</a></li>
                    <li><a href="#about" onClick={handleNavClick}>ABOUT</a></li>
                    <li className="dropdown">
                        ACADEMICS
                        <ul className="dropdown-menu">
                            <li><a href="#acalender">Academic Calendar</a></li>
                            <li><a href="#gradmat">Grad & Matriculation</a></li>
                            <li><a href="#program">Programmes</a></li>
                            <li className="dropdown-submenu text-white">
                                Faculties
                                <ul className="submenu">
                                    <li><a href="#science">Faculty of Science</a></li>
                                    <li><a href="#business">Faculty of Business</a></li>
                                    <li><a href="#arts">Faculty of Arts</a></li>
                                    <li><a href="#it">Faculty of IT</a></li>
                                </ul>
                            </li>
                            <li><a href="#course">Certficte Course</a></li>
                            <li><a href="#">Src</a></li>
                            <li><a href="#">Events</a></li>
                            <li><a href="#">Media</a></li>
                            <li><a href="#">Refferals</a></li>
                        </ul>
                    </li>

                    <li><a href="#admission">ADMISSIONS</a></li>
                    <li className="dropdown">
                        LIBRARY
                        <ul className="dropdown-menu">
                            <li><a href="#">Research</a></li>
                            <li><a href="#">Research 2</a></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        NEWS
                        <ul className="dropdown-menu">
                            <li><a href="#news1">WEUC News</a></li>
                            <li><a href="#news3">WEUC Events</a></li>
                        </ul>
                    </li>
                    <li><a href="#contact">CONTACT</a></li>
                </ul>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search Here"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="search-input"
                    />

                    {filtered.length > 0 && (
                        <div className="search-dropdown">
                            {filtered.map(item => (
                                <div
                                    key={item.id}
                                    className="dropdown-item"
                                    onClick={() => {
                                        setSelectedProduct(item);
                                        setSearchTerm('');
                                        setFiltered([]);
                                    }}
                                >
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Link to="/login">
                    <button className="login-btn mt-3"><FaSignInAlt /> Login</button>
                </Link>
            </div>

            {selectedProduct && (
                <div className="product-popup">
                    <div className="popup-card">
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                        />
                        <h2>{selectedProduct.name}</h2>
                        <p>{selectedProduct.description}</p>
                        <p className="price">₵ {selectedProduct.price}</p>

                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={e => setQuantity(Number(e.target.value))}
                        />

                        <div className="button-group">
                            <button
                                className="add-cart"
                                onClick={() => {
                                    const cart = JSON.parse(localStorage.getItem('cart')) || [];
                                    cart.push({ ...selectedProduct, quantity });
                                    localStorage.setItem('cart', JSON.stringify(cart));

                                    setShowNotification(true);
                                    setTimeout(() => setShowNotification(false), 3000);
                                }}
                            >
                                Add to Cart
                            </button>

                            <button
                                className="view-cart"
                                onClick={() => window.location.href = '#cart'}
                            >
                                View Cart
                            </button>

                            <button
                                className="cancel"
                                onClick={() => setSelectedProduct(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default Navbar;
