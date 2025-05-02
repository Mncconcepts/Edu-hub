import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";


const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCheckmarkVisible, setIsCheckmarkVisible] = useState(false);
  const navigate = useNavigate();

  // Handle form data changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Validate password
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,11}$/;
    return regex.test(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { fullName, email, password } = formData;

    if (!fullName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be 6-11 characters long, contain at least one number, one uppercase letter, and one special character.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const isEmailTaken = users.some((user) => user.email === email);

    if (isEmailTaken) {
      setError("Email is already registered. Please use a different email.");
      return;
    }

    const newUser = { fullName, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setError("");

    // Display loader and success animation
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsCheckmarkVisible(true);

    
      setTimeout(() => {
        setIsCheckmarkVisible(false);
        navigate("/login");
      }, 2000);
    }, 1500); 
  };

  const handleGoogleSignUp = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google Sign-In Success:", result.user);
        setIsCheckmarkVisible(true);
        setTimeout(() => setIsCheckmarkVisible(false), 2000);
      })
      .catch((error) => {
        setError("Google Sign-In Failed: " + error.message);
      });
  };


  return (
    <div className="bodyyy">
      {isLoading && (
        <div className="loadings-container">
          <div className="circles-loader"></div>
          <p>Signing up...</p>
        </div>
      )}

      {isCheckmarkVisible && (
        <div className="success-container">
          <div className="circles-loader load-complete">
            <div className="checkmarks draw"></div>
          </div>
          <p>Signup Successful!</p>
        </div>
      )}

      {!isLoading && !isCheckmarkVisible && (
        <div className="forms-container">
          <div className="forms-header">
            <i className="fas fa-user-plus"></i>
            <h2 className="sub-head">CREATE YOUR ACCOUNT<br /></h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="forms-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <i className="fas fa-user"></i>
            </div>
            <div className="forms-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <i className="fas fa-envelope"></i>
            </div>
            <div className="forms-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
            {error && <div className="errors-message">{error}</div>}
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>

          {/* Google Sign Up Button */}
          <button className="google-signup" onClick={handleGoogleSignUp}>
            <FaGoogle /> Sign Up with Google
          </button>

          <div className="forms-footer">
            <strong className="me-3">Already have an account?</strong><Link to="/login">Login Here</Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Signup;
