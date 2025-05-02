import React, { useState, useEffect } from "react";
import "./Cart.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [shipping, setShipping] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [productData, setProductData] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        fetch("/product.json")
            .then(res => res.json())
            .then(data => setProductData(data));
    }, []);

    const handleQuantityChange = (id, change) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };


    useEffect(() => {
        const fetchCartAndProducts = async () => {
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

            try {
                const res = await fetch("/product.json");
                const data = await res.json();
                setProducts(data);

                const updatedCart = storedCart.map((cartItem) => {
                    const matchedProduct = data.find((product) => product.id === cartItem.id);
                    if (matchedProduct) {
                        return {
                            ...cartItem,
                            name: matchedProduct.name,
                            price: matchedProduct.price,
                            image: matchedProduct.image || matchedProduct.img,
                            quantity: cartItem.quantity || 1, // Make sure quantity is set
                        };
                    }
                    return cartItem;
                });
                


                setCart(updatedCart);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchCartAndProducts();
    }, []);


    const removeItem = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleDeleteFromCart = (id) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart = cart.filter(item => item.id !== id);

        localStorage.setItem("cart", JSON.stringify(cart));

        window.dispatchEvent(new Event("storage"));
    };

    const subtotal = cart.reduce((acc, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        const itemQuantity = parseInt(item.quantity, 10) || 0;
        return acc + itemPrice * itemQuantity;
    }, 0);

    const total = subtotal + shipping;

    // console.log("Cart:", cart);


    return (
        <div className="about-container">
            <div className="about-header">
                <div className="about-header-content">
                    <h1>CART PAGE</h1>
                    <p>Cart-Page</p>
                </div>
            </div>
            <div className={`cart-content ${showPopup ? "blurred" : ""}`}>
                <h1 className="cart-title">Your Cart</h1>

                {cart.length === 0 ? (
                    <div className="empty-cart-container">
                        <img
                            src="/empty cart.png"
                            alt="Empty Cart"
                            className="empty-cart-image"
                        />
                        <Link to="/shop">
                            <button className="empty-cart">Cart is empty, Back to Shop!</button>
                        </Link>
                    </div>
                ) : (

                    <>
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id}>
                                        <td className="productt-info">
                                            <div key={item.id}>
                                                <img src={item.image} alt={item.name} className="productt-img" />
                                                <p>{item.name}</p>
                                                <button type="submit" onClick={() => removeItem(item.id)} className="btn remove-btn">Delete</button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="quantity-control">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    className="qty-btn"
                                                >
                                                    -
                                                </button>
                                                <span className="qty-text">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    className="qty-btn"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="price">${(parseFloat(item.price) || 0).toFixed(2)}</td>
                                        <td className="subtotal">${((parseFloat(item.price) || 0) * (parseInt(item.quantity, 10) || 0)).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="cart-summary-container">
                            <div className="coupon-section">
                                <h2>Have a coupon?</h2>
                                <div className="coupon-input">
                                    <input type="text" placeholder="Enter code" className="coupon-field w-100" /> <br />
                                    <button className="apply-btn">Apply</button>
                                </div>
                            </div>
                        </div>

                        <div className="cart-summary">
                            <h2>Cart Summary</h2>
                            <p>
                                Subtotal: <span>${subtotal.toFixed(2)}</span>
                            </p>
                            <p className="total">Total: ${total.toFixed(2)}</p>
                            <Link to="/checkout">
                            <button className="checkoutt-btn" onClick={() => setShowPopup(true)}>
                                Proceed to Checkout
                            </button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
