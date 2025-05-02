import React from "react";
import "./Loader.css"; 

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-card">
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loader;
