import React, { useState, useEffect } from "react";
import "./Notification.css";
import Footer from "./Footer";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [expanded, setExpanded] = useState(null);

  // Fetch notifications from local storage on component mount
  useEffect(() => {
    const storedNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
  }, []);

  // Add a notification to local storage
  const addNotification = (type, title, details) => {
    const userData = {
      name: localStorage.getItem("username") || "Unknown User",
      email: localStorage.getItem("email") || "Unknown Email",
      bio: localStorage.getItem("bio") || "No Bio Available",
    };

    const newNotification = {
      type,
      title,
      details,
      user: `${userData.name} (${userData.email})`,
      bio: userData.bio,
      date: new Date().toLocaleString(),
    };

    const updatedNotifications = [...notifications, newNotification];
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  // Delete a notification
  const deleteNotification = (index) => {
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    alert("Notification deleted successfully!");
  };

  // Example usage (these functions simulate user actions)
  const simulateLogin = () => {
    addNotification(
      "Login",
      "User Logged In",
      "You have successfully logged in."
    );
  };

  const simulateProfileUpdate = () => {
    addNotification(
      "Update",
      "Profile Updated",
      "Your profile information has been updated."
    );
  };

  // Toggle details view
  const toggleDetails = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="about-container">
      <h1 className="notifications-header">NOTIFICATIONS</h1>
      <button onClick={simulateLogin} className="simulate-btn">
        Simulate Login
      </button>
      <button onClick={simulateProfileUpdate} className="simulatee-btn">
        Simulate Profile Update
      </button>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className="notificationn-item">
            <div className="notificationn-header">
              <span
                className={`badgeee ${
                  notification.type ? notification.type.toLowerCase() : "unknown"
                }`}
              >
                {notification.type || "Unknown"}
              </span>
              <h3>{notification.title}</h3>
              <button
                className="details-button"
                onClick={() => toggleDetails(index)}
              >
                {expanded === index ? "Show Less" : "Read More"}
              </button>
              <button
                className="delete-button"
                onClick={() => deleteNotification(index)}
              >
                Delete
              </button>
            </div>
            {expanded === index && (
              <div className="notificationn-details">
                <p>{notification.details || "No details available."}</p>
                <p className="notificationn-user">
                  {notification.user || "Unknown User"}
                </p>
                <p className="notificationn-bio">
                  Bio: {notification.bio || "No Bio Available"}
                </p>
                <p className="notificationn-date">
                  {notification.date || "Unknown Date"}
                </p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="notifications-empty">No notifications available.</p>
      )}
    </div>
    
  );
};

export default Notification;
