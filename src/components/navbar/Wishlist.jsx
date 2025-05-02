import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Cart.css";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [products, setProducts] = useState([]);
    const [loadingItemId, setLoadingItemId] = useState(null);
    const [addedToCartId, setAddedToCartId] = useState(null);
    const [notification, setNotification] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWishlistAndProducts = async () => {
            const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    
            try {
                const res = await fetch("/products.json");
                const data = await res.json();
                setProducts(data);
    
                const updatedWishlist = storedWishlist.map((wishlistItem) => {
                    const matchedProduct = data.find((product) => {
                        return String(product.id) === String(wishlistItem.id);
                    });
    
                    return {
                        ...wishlistItem,
                        id: wishlistItem.id,
                        name: matchedProduct?.name || wishlistItem.name || "Unnamed Product",
                        price: matchedProduct?.price || wishlistItem.price || 0,
                        img: matchedProduct?.img || wishlistItem.img || "/default-image.jpg",
                        description: matchedProduct?.description || wishlistItem.description || "",
                        category: matchedProduct?.category || wishlistItem.category || "",
                    };
                });
    
                setWishlist(updatedWishlist);
            } catch (error) {
                console.error("Error fetching products.json, loading from localStorage only:", error);
                setWishlist(storedWishlist);
            }
        };

        fetchWishlistAndProducts();
    }, []);

    const removeItem = (id) => {
        const updatedWishlist = wishlist.filter((item) => item.id !== id);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setNotification("Item removed from Wishlist!");
        setTimeout(() => setNotification(""), 3000);
    };

    const addToCart = (item) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            navigate("/cart");
        } else {
            setLoadingItemId(item.id);

            setTimeout(() => {
                const updatedCart = [...cart, { ...item, quantity: 1 }];
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                setLoadingItemId(null);
                setAddedToCartId(item.id);
            }, 1500);
        }
    };

    const handleDeleteFromWishlist = (id) => {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        wishlist = wishlist.filter(item => item.id !== id);

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        window.dispatchEvent(new Event("storage"));
    };

    return (
        <div className="about-container">
            <div className="about-header">
                <div className="about-header-content">
                    <h1>WISHLIST PAGE</h1>
                    <p>Wishlist-Page</p>
                </div>
            </div>
            {notification && (
                <div className="notificationn-bar">
                    {notification && (
                        <motion.div
                            className="notificationn-bar"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.div
                                animate={{ x: [-5, 5, -5, 5, 0] }}
                                transition={{ duration: 0.5 }}
                            >
                                {notification}
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            )}

            <div className="cart-content">
                <h1 className="cart-title mt-5">Your Wishlist</h1>

                {wishlist.length === 0 ? (
                    <div className="empty-cart-container">
                        <img
                            src="/emptywishlist.png"
                            alt="Empty Wishlist"
                            className="empty-cart-image"
                        />
                        <Link to="/shop">
                            <button className="empty-cart">Wishlist is empty, Back to Shop!</button>
                        </Link>
                    </div>
                ) : (
                    <motion.div
                        className="wishlist-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {wishlist.map((item) => (
                            <div className="wishlist-card" key={item.id}>
                                <img src={item.img} alt={item.name} className="wishlist-img" />
                                <h2 className="wishlist-name">{item.name}</h2>
                                <p className="wishlist-price">${parseFloat(item.price).toFixed(2)}</p>
                                {item.category && <p className="wishlist-category">{item.category}</p>}
                                {item.description && <p className="wishlist-description">{item.description}</p>}
                                <div className="wishlist-buttons">
                                    {addedToCartId === item.id ? (
                                        <Link to="/cart">
                                            <button className="wishlist-btn view-cart-btn">View Cart</button>
                                        </Link>
                                    ) : (
                                        <button className="wishlist-btn" onClick={() => addToCart(item)}>
                                            {loadingItemId === item.id ? (
                                                <div className="spinnerr"></div>
                                            ) : (
                                                "Add to Cart"
                                            )}
                                        </button>
                                    )}
                                    <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
