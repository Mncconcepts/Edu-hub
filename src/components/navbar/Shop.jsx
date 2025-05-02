import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaSearch,
  FaHeart,
  FaTh,
  FaBars,
  FaEye,
} from "react-icons/fa";
import "./Shop.css";

const Shop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortType, setSortType] = useState("Default");
  const [isGridView, setIsGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistAlert, setWishlistAlert] = useState(null);
  const [cartStatus, setCartStatus] = useState({});
  const [popupProduct, setPopupProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showViewCart, setShowViewCart] = useState(false);
  const [showViewWishlist, setShowViewWishlist] = useState(false);



  const productsPerPage = 9;

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setSortedProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    let sorted = [...products];
    if (sortType === "Price: Low to High") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "Price: High to Low") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setSortedProducts(sorted);
  }, [sortType, products]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(stored);
    } catch (err) {
      console.error("Error loading wishlist:", err);
      setWishlist([]);
    }
  }, []);

  const handleSortChange = (e) => setSortType(e.target.value);
  const toggleView = () => setIsGridView((prev) => !prev);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);

  const handleAddToCart = (product, qty = 1) => {
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productToAdd = { ...product, quantity: qty };

    // Check if already exists
    const existingIndex = updatedCart.findIndex((item) => item.id === product.id);
    if (existingIndex !== -1) {
      updatedCart[existingIndex].quantity += qty;
    } else {
      updatedCart.push(productToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCartStatus((prev) => ({ ...prev, [product.id]: "loading" }));
    setTimeout(() => {
      setCartStatus((prev) => ({ ...prev, [product.id]: "done" }));
    }, 1500);

    setIsAdding(true);
    setIsAdded(false);
    setShowViewCart(false);
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => {
        setShowViewCart(true);
      }, 800);
      setTimeout(() => setIsAdded(false), 2000);
    }, 1500);
  };

  const handleWishlist = (product) => {
    const alreadyExists = wishlist.some((item) => item.id === product.id);
    if (alreadyExists) {
      setWishlistAlert(`${product.name} is already in your wishlist`);
    } else {
      const updated = [...wishlist, product];
      setWishlist(updated);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setWishlistAlert(`${product.name} added to wishlist`);
      setShowViewWishlist(true);
    }
    setTimeout(() => {
      setWishlistAlert(null);
      setShowViewWishlist(false);
    }, 4500);
  };

  const handleViewSingle = (product) => {
    setPopupProduct(product);
    setQuantity(1);
  };

  const handleClosePopup = () => {
    setPopupProduct(null);
  };

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = parseFloat(item.price) || 0;
    const itemQuantity = parseInt(item.quantity, 10) || 0;
    return acc + itemPrice * itemQuantity;
  }, 0);

  window.dispatchEvent(new Event("storage"));

  return (
    <div className="about-container">
      <div className="about-header">
        <div className="about-header-content">
          <h1>SHOP PAGE</h1>
          <p>Shop-Page</p>
        </div>
      </div>

      {wishlistAlert && (
        <div className="wishlist-notification-bar">
          <p>{wishlistAlert}</p>
        </div>
      )}

      <div className="shop-header">
        <h2>
          Showing {indexOfFirst + 1}-{Math.min(indexOfLast, sortedProducts.length)} of{" "}
          {sortedProducts.length} results
        </h2>

        <div className="shop-controls">
          <select className="sort-select" onChange={handleSortChange}>
            <option>Default sorting</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>

          <button className="toggle-view-btn" onClick={toggleView}>
            {isGridView ? <FaBars /> : <FaTh />}
          </button>
        </div>
      </div>

      <div className={`product-grid ${isGridView ? "grid-view" : "list-view"}`}>
        {currentProducts.map((product) => (
          <div className="product-card course-card" key={product.id}>
            <div className="image-box">
              <img src={product.image} alt={product.name} className="product-image" />

              <div className="card-overlay">
                <div className="hover-icoons">
                  <button
                    className="icoon-button yellow"
                    onClick={() => handleAddToCart(product)}
                  >
                    {cartStatus[product.id] === "loading" ? (
                      <span className="spinner"></span>
                    ) : cartStatus[product.id] === "done" ? (
                      <span className="checkmark">✓</span>
                    ) : (
                      <FaShoppingCart />
                    )}
                  </button>

                  <button className="icoon-button" onClick={() => handleViewSingle(product)}>
                    <FaEye />
                  </button>

                  <button className="icoon-button" onClick={() => handleWishlist(product)}>
                    <FaHeart />
                  </button>
                </div>
              </div>
            </div>

            <div className="product-info">
              <h3>{product.name}</h3>
              {!isGridView && <p className="description">{product.description}</p>}
              <p className="price">
                {product.oldPrice && <span className="old-price">£{product.oldPrice}</span>}
                <span> £{product.price}</span>
              </p>
              <button
                className="quick-view-btn"
                onClick={() => handleViewSingle(product)}
              >
                View Single
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(sortedProducts.length / productsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {popupProduct && (
        <div className="product-poopup">
          <div className="poopup-content">
            <img src={popupProduct.image} alt={popupProduct.name} />

            <div className="poopup-details">
              <h2>{popupProduct.name}</h2>
              <p>{popupProduct.description}</p>
              <p><strong>Price:</strong> £{popupProduct.price}</p>

              <div className="quantity-selector">
                <label>Quantity:</label>
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className={`poopup-actions ${isAdded ? "shake" : ""}`}>
                <button
                  className="add-btn"
                  onClick={() => handleAddToCart(popupProduct, quantity)}
                  disabled={isAdding}
                >
                  {isAdding ? (
                    <span className="spiinner"></span>
                  ) : isAdded ? (
                    <span className="success-message text-white">✔ Item added</span>
                  ) : (
                    "Add to Cart"
                  )}
                </button>

                {showViewCart && (
                  <div className="slide-in-cart">
                    <button className="view-cartt-btn" onClick={() => navigate("/cart")}>
                      View Cart
                    </button>
                  </div>
                )}

                <button className="cancel-btn" onClick={handleClosePopup}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
