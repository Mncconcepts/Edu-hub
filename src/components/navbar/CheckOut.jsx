import React, { useState, useEffect } from "react";
import "./CheckOut.css";
import { Link } from "react-router-dom";

const CheckOut = () => {
    const [cart, setCart] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [showPopup, setShowPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Fetch products from localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission (Show Popup First)
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPopup(true);
    };

    // Handle Yes Button (Start Processing Payment)
    const handleYes = () => {
        setShowPopup(false);
        setIsProcessing(true);
    };

    return (
        <div className="about-container">
            <div className="about-header">
                <div className="about-header-content">
                    <h1>CHECKOUT PAGE</h1>
                    <p>Checkout-Page</p>
                </div>
            </div>
            {/* Left Side - Selected Products */}
            <div className="cartt-summary">
                <h2>Order Status</h2>
                <div className="cart-items-container">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-img" />
                                <div className="cart-item-details">
                                    <p>{item.name}</p>
                                    <p>{item.quantity} x ${item.price}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products in the cart.</p>
                    )}
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="checkoutt-form mt-5">
                <h2>Enter Your Details</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Your Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit" className="checkoutt-btn">Place Order</button>
                </form>
            </div>

            {/* Confirmation Popup */}
            {showPopup && (
                <div className="poopup-overlay">
                    <div className="poopup-card">
                        <p>Are you sure you want to process your payment?</p>
                        <div className="poopup-buttons">
                            <button onClick={handleYes} className="yes-btn">Yes</button>
                            <button onClick={() => setShowPopup(false)} className="no-btn">No</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CheckOut;
