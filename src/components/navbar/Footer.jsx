import React from "react";
import "./Footer.css";
import {
    FaFacebookF,
    FaTwitter,
    FaGooglePlusG,
    FaLinkedinIn,
    FaPinterestP,
    FaEnvelope,
    FaPhoneAlt,
    FaPaperPlane,
} from "react-icons/fa";

const Footer = () => {
    // Scroll to top functionality
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* About Section */}
                <div className="footer-about">
                    <img src="/logo.png" alt="WEUC Logo" className="footer-logo" />
                    <h3>About WEUC</h3>
                    <p>
                        To respond to the educational and technical needs of our society
                        through an array of comprehensive programmes and services that
                        facilitate learning, research and outreach activities aimed at
                        fostering effective leadership, organizational change, innovation
                        and social stewardship
                    </p>
                    <div className="social-icons">
                        <FaFacebookF />
                        <FaTwitter />
                        <FaGooglePlusG />
                        <FaLinkedinIn />
                        <FaPinterestP />
                    </div>
                </div>

                {/* Information Section */}
                <div className="footer-info">
                    <h3>Information</h3>
                    <p>
                        <FaPaperPlane className="icon" /> P.O Box AN 15402, Accra-Ghana
                    </p>
                    <p>
                        <FaPhoneAlt className="icon" /> +233-505091995
                    </p>
                    <p>
                        <FaPhoneAlt className="icon" /> +233-274222294
                    </p>
                    <p>
                        <FaEnvelope className="icon" /> info@weuc.edu.gh
                    </p>
                </div>

                {/* LikeBox Section */}
                <div className="footer-likebox">
                    <h3>LikeBox</h3>
                    <p>Follow us on Facebook for the latest updates, events, and more from WEUC.</p>
                    <div className="likebox-placeholder">
                        <div className="likebox-embed">[Facebook Plugin Placeholder]</div>
                    </div>
                </div>
            </div>

            {/* Bottom Strip */}
            <div className="footer-bottom">
                <p>
                    2020 © Copyright West End University College, Accra, Ghana. Accredited by National
                    Accreditation Board & Affiliated to University of Cape Coast. ALL RIGHTS RESERVED.
                    Designed and Developed by <strong>WEUC</strong>
                </p>
                <div className="payment-icons">
                    <img src="/logoVisa.png" alt="Visa" />
                    <img src="/logoDiscover.png" alt="Discover" />
                    <img src="/logo2Paypal.png" alt="PayPal" />
                    <img src="/logo2Mastercard.webp" alt="Mastercard" />
                </div>
            </div>

            {/* Scroll to Top Arrow */}
            <div className="scroll-top" onClick={scrollToTop}>
                <strong className="ms-1">↑</strong>
            </div>
        </footer>
    );
};

export default Footer;
