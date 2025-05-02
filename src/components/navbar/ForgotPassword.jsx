import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Handle email input change
    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    // Validate email format
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email) {
            setError("Please enter your email.");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setError("");
        setIsLoading(true);

        // Simulate sending reset email
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 6000);
    };

    return (
        <div className="boddy">
            <div className="formm-container">
                {isLoading ? (
                    <div className="loading-animation">
                        <div className="spinner"></div>
                        <p>Sending reset instructions...</p>
                    </div>
                ) : isSuccess ? (
                    <div className="success-message">
                        <i className=" icon fas fa-check-circle"></i>
                        <p>Reset link sent! Confirm in your email </p>
                    </div>
                ) : (
                    <div className="formm-content">
                        <h1>Forgot Password ?</h1>
                        <p>No worries, enter your email and we'll send reset instructions.</p>

                        <form onSubmit={handleSubmit}>
                            <div className="formm-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {error && <div className="error-message">{error}</div>}

                            <button type="submit" className="reset-button">
                                Send Reset Link
                            </button>
                        </form>

                        <div className="form-footer">
                            <a href="#login" className="back-to-login">
                                Back to Login
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
