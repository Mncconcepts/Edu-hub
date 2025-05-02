import React, { useState, useRef } from 'react';
import './Admission.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

const Admission = () => {
    const [sameAsCurrent, setSameAsCurrent] = useState(true);
    const years = Array.from({ length: 30 }, (_, i) => 2025 - i);
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

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
    }

    return (
        <div className="about-container">
            <div className="about-header">
                <div className="about-header-content">
                    <h1>ADMISSION</h1>
                    <p>Bridging Academia & Industry</p>
                </div>
            </div>
            <h2 className="formm-title">2025/2026 WEUC Online Application Form</h2>

            <form onSubmit={handleSubmit} className="admission-form">
                {/* Left Section */}
                <div className="formm-card">
                    <h3 className="card-title">Personal Information</h3>

                    <div className="formm-group">
                        <label>First Name *</label>
                        <input type="text" placeholder="Enter your first name" required />
                    </div>

                    <div className="formm-group">
                        <label>Middle Name</label>
                        <input type="text" placeholder="Enter your middle name" />
                    </div>

                    <div className="formm-group">
                        <label>Last Name *</label>
                        <input type="text" placeholder="Enter your last name" required />
                    </div>

                    <div className="formm-group">
                        <label>Gender *</label>
                        <select required>
                            <option value="">-- Select Gender --</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className="formm-group">
                        <label>Date of Birth *</label>
                        <input type="date" required />
                    </div>

                    <div className="formm-group">
                        <label>Contact Number *</label>
                        <input type="tel" placeholder="Enter phone number" required />
                    </div>

                    <div className="formm-group">
                        <label>Email *</label>
                        <input type="email" placeholder="Enter your email" required />
                    </div>

                    <div className="formm-group">
                        <label>Upload Photo</label>
                        <div className="photo-upload" onClick={handleImageClick}>
                            <img
                                src="https://img.icons8.com/emoji/96/camera-emoji.png"
                                alt="Upload"
                                className="upload-icon"
                            />
                            <p>Click to Change Picture</p>
                        </div>
                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />

                        {/* Display the selected image if available */}
                        {selectedImage && (
                            <div className="image-preview">
                                <img src={selectedImage} alt="Selected Preview" />
                            </div>
                        )}
                    </div>
                </div>


                {/* Identity Section */}
                <div className="formm-card">
                    <h3 className="card-title">Identity</h3>

                    <div className="formm-group">
                        <label>Country of Origin *</label>
                        <select required>
                            <option value="Nigeria">Nigeria</option>
                        </select>
                    </div>

                    <div className="formm-group">
                        <label>Place of Birth</label>
                        <input type="text" placeholder="e.g. Lagos, Nigeria" />
                    </div>

                    <div className="formm-group">
                        <label>Nationality *</label>
                        <input type="text" value="Nigerian" readOnly />
                        <span className="status-text">Status <em>[Nigeria]</em></span>
                    </div>

                    <div className="formm-group">
                        <label>Identity Document Type</label>
                        <select>
                            <option value="nigeria identity-card">Nigerian identity Card</option>
                        </select>
                    </div>

                    <div className="formm-group">
                        <label>ID Number</label>
                        <input type="text" />
                    </div>
                </div>
                <div className="formm-card">
                    <h3 className="card-title">Current Address</h3>

                    <div className="formm-group">
                        <label>Country *</label>
                        <select required>
                            <option value="Nigeria">Nigeria</option>
                        </select>
                    </div>

                    <div className="formm-group">
                        <label>State/Region</label>
                        <input type="text" />
                    </div>

                    <div className="formm-group">
                        <label>District/City</label>
                        <input type="text" />
                    </div>

                    <div className="formm-group">
                        <label>Address</label>
                        <textarea rows="3"></textarea>
                    </div>
                </div>

                {/* Permanent Address Section */}
                <div className="formm-card">
                    <h3 className="card-title">Permanent Address</h3>

                    <div className="formm-group">
                        <label>Same as Current Address?</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="sameAsCurrent"
                                    value="yes"
                                    onChange={() => setSameAsCurrent(true)}
                                    defaultChecked
                                />{" "}
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="sameAsCurrent"
                                    value="no"
                                    onChange={() => setSameAsCurrent(false)}
                                />{" "}
                                No
                            </label>
                        </div>
                    </div>

                    {!sameAsCurrent && (
                        <>
                            <div className="formm-group">
                                <label>Country *</label>
                                <select required>
                                    <option value="Nigeria">Nigeria</option>
                                </select>
                            </div>

                            <div className="formm-group">
                                <label>State/Region</label>
                                <input type="text" />
                            </div>

                            <div className="formm-group">
                                <label>District/City</label>
                                <input type="text" />
                            </div>

                            <div className="formm-group">
                                <label>Address</label>
                                <textarea rows="3"></textarea>
                            </div>
                        </>
                    )}
                </div>

                {/* Parent/Guardian Information Section */}
                <div className="formm-card">
                    <h3 className="card-title">Parent/Guardian Information</h3>

                    <div className="formm-group">
                        <label>Name</label>
                        <input type="text" />
                    </div>

                    <div className="formm-group">
                        <label>Occupation</label>
                        <input type="text" />
                    </div>

                    <div className="formm-group">
                        <label>Contact Number</label>
                        <input type="tel" />
                    </div>

                    <div className="formm-group">
                        <label>Address</label>
                        <textarea rows="3"></textarea>
                    </div>
                </div>


                {/* Right Section */}
                <div className="formm-card">
                    <h3 className="card-title">Programme Details</h3>

                    <div className="formm-group">
                        <label>Title of Programme *</label>
                        <select required>
                            <option value="">-- Select Programme --</option>
                            <option value="nursing">B.Sc - Nursing</option>
                        </select>
                    </div>

                    <div className="formm-group">
                        <label>Type of Application *</label>
                        <select required>
                            <option value="">-- Select Type --</option>
                            <option value="mature">Mature</option>
                            <option value="generic">Generic</option>
                        </select>
                    </div>

                    <div className="formm-group">
                        <label>Stream *</label>
                        <select required>
                            <option value="">-- Select Stream --</option>
                            <option value="weekday">Weekday</option>
                            <option value="evening">Evening</option>
                        </select>
                    </div>

                    <div className="formm-group">
                        <label>Certificate *</label>
                        <select required>
                            <option value="">-- Select Certificate --</option>
                            <option value="wassce">WASSCE</option>
                        </select>
                    </div>

                    <div className="formm-group">
                        <label>Result Obtained *</label>
                        <textarea placeholder="WASSCE 2010, English A1, Math B2..." rows="3" required></textarea>
                    </div>

                    <div className="formm-group">
                        <label>Area of Specialisation</label>
                        <input type="text" placeholder="e.g. Science" />
                    </div>
                </div>
            </form>

            <div className="admission-form">
                <div className="formm-card">
                    <h3 className="formm-title">Secondary Education</h3>
                    <label>Name and Address of Institution Attended</label>
                    <textarea rows="4" placeholder="Enter school name and address"></textarea>

                    <label>Year of Completion</label>
                    <select>
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>

                    <label>Certificate Obtained</label>
                    <select>
                        <option>West African Senior School Certificate (WASSCE)</option>
                        <option>SSSCE</option>
                    </select>
                </div>

                <div className="formm-card">
                    <h3 className="formm-title">Post-Secondary/Pre-Tertiary Education</h3>
                    <label>Name and Address of Institution Attended</label>
                    <textarea rows="4" placeholder="Enter name and address of institution"></textarea>

                    <label>Year of Completion</label>
                    <select>
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <label>Certificate Obtained</label>
                    <input type="text" placeholder="Name or description of certificate" />
                </div>
                <div className="submit-container">
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
                            "Submit Form"
                        )}
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Admission;
