import React, { useState, useEffect } from 'react';
import './Profile.css';
import Footer from './Footer';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('My details');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        bio: '',
        profileImage: '',
    });
    const [notification, setNotification] = useState('');

    // Load data from localStorage on component mount
    useEffect(() => {
        const storedData = {
            name: localStorage.getItem('username') || '',
            email: localStorage.getItem('email') || '',
            password: localStorage.getItem('password') || '',
            bio: localStorage.getItem('bio') || '',
            profileImage: localStorage.getItem('profileImage') || '',
        };
        setFormData(storedData);
    }, []);

    const handleTabClick = (tab) => setActiveTab(tab);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 2000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem('username', formData.name);
        localStorage.setItem('email', formData.email);
        localStorage.setItem('password', formData.password);
        localStorage.setItem('bio', formData.bio);
        localStorage.setItem('profileImage', formData.profileImage);

        showNotification('Details updated successfully!');
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    profileImage: reader.result,
                }));
                localStorage.setItem('profileImage', reader.result);
                showNotification('Profile image updated successfully!');
            };
            reader.readAsDataURL(file);
        }
    };

    // **Reset all details**
    const resetAllDetails = () => {
        const defaultData = {
            name: '',
            email: '',
            password: '',
            bio: '',
            profileImage: '',
        };

        // Clear state
        setFormData(defaultData);

        // Remove all stored data from localStorage
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('bio');
        localStorage.removeItem('profileImage');

        showNotification('All details have been reset successfully!');
    };

    return (
        <div className="bd">
            {notification && (
                <div className="popup-notification">
                    <div className="popup-content">
                        <div className="success-icon">
                            <span>&#10003;</span>
                        </div>
                        <p>{notification}</p>
                        <div className="loading-bar"></div>
                    </div>
                </div>
            )}
            <div className="container">
                <main className="main-content">
                    <div className="content-wrapper">
                        {/* Profile Cover */}
                        <div className="profilee-cover">
                        </div>
                        <div className="profilee-header">
                            <input
                                type="file"
                                accept="image/ *"
                                id="profileImageInput"
                                style={{ display: 'none' }}
                                onChange={handleProfileImageChange}
                            />
                            <label htmlFor="profileImageInput">
                                <img
                                    src={formData.profileImage || '/user1.png'}
                                    alt="Profile"
                                    className="profilee-img-large"
                                    style={{ cursor: 'pointer' }}
                                />
                            </label>
                        </div>
                        <p className="user-email">{formData.email}</p>
                        <p className="user-bio">{formData.bio || 'Add a short bio about yourself.'}</p>
                        <h2 className="main-title">Settings</h2>

                        {/* Navigation Tabs */}
                        <nav className="tabs">
                            {['My details', 'Profile', 'Password'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabClick(tab)}
                                    className={`tab-item ${activeTab === tab ? 'active-tab' : ''}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>

                        {/* Sections */}
                        {activeTab === 'My details' && (
                            <div className="details-section">
                                <h2>My Details</h2>
                                <form className="details-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <button type="submit" className="btn buttonz">Update Details</button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'Profile' && (
                            <div className="profilee-section">
                                <h2>Profile</h2>
                                <form className="profilee-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Bio</label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            placeholder="Write a short bio about yourself"
                                            rows="4"
                                        />
                                    </div>
                                    <button type="submit" className="buttonz">Update Profile</button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'Password' && (
                            <div className="password-section">
                                <h2>Password</h2>
                                <form className="password-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>New password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="Enter a new password"
                                        />
                                    </div>
                                    <button type="submit" className="btn buttonz">Update details</button>

                                    <button
                                        type="button"
                                        className="reset-button"
                                        onClick={resetAllDetails}
                                    >
                                        Reset All Details
                                    </button>
                                </form>
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Profile;
