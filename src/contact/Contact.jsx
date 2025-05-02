import React, { useState } from "react";
import "./Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClinicMedical, faEnvelope, faPhone, faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
            }, 4000);
        }, 3000);
    };

    return (
        <div className="about-container">
            <div className="about-header">
                <div className="about-header-content">
                    <h1>Contact Us</h1>
                    <p>West End University College - contact section</p>
                </div>
            </div>

            <div className="contact-content">
                <div data-aos="fade-down" className="contact-info">
                    <h2>Don't Hesitate to Contact Us</h2>
                    <p>Need Help? Reach us out now we are eager to hear from you</p>
                    <div className="contact-details">
                        <div className="detail">
                            <FontAwesomeIcon icon={faClinicMedical} className="iicon" />
                            <div>
                                <h3>Our Address</h3>
                                <p>Lagos Nigeria</p>
                            </div>
                        </div>
                        <div className="detail">
                            <FontAwesomeIcon icon={faEnvelope} className="iicon" />
                            <div>
                                <h3>Our Email</h3>
                                <p>info@weuc.edu.gh | info@weuc.edu.gh</p>
                            </div>
                        </div>
                        <div className="detail">
                            <FontAwesomeIcon icon={faPhone} className="iicon" />
                            <div>
                                <h3>Our Phone</h3>
                                <p>(+234) 902-0495-758 | (+234) 913-319-4835</p>
                            </div>
                        </div>
                    </div>

                    <div className="social-mediaa">
                        <h3>Social Media</h3>
                        <div className="social-iconss">
                            <FontAwesomeIcon icon={faFacebook} className="icon" />
                            <FontAwesomeIcon icon={faTwitter} className="icon" />
                            <FontAwesomeIcon icon={faInstagram} className="icon" />
                            <FontAwesomeIcon icon={faLinkedin} className="icon" />
                        </div>
                    </div>
                </div>

                <div data-aos="zoom-in" className="contact-formm">
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Full Name" required />
                        <input type="email" placeholder="Your Email" required />
                        <input type="text" placeholder="Subject" required />
                        <textarea placeholder="Write Your Message" required></textarea>

                        <button className="send-message" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <FontAwesomeIcon icon={faSpinner} spin /> Submitting...
                                </>
                            ) : isSubmitted ? (
                                <>
                                    <FontAwesomeIcon icon={faCheck} /> Message Sent Successfully
                                </>
                            ) : (
                                "Send Message"
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <div className="contact-map">
                <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501367.3338875357!2d3.147819319464772!3d6.632330681828621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1741768659341!5m2!1sen!2sng"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;
