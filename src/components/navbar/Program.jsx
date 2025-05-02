import React from "react";
import "./Program.css";

const Program = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <div className="about-header-content">
                    <h1>Programmes</h1>
                    <p>West End University College - programmes</p>
                </div>
            </div>
            <section className="program-section">
                <h2 className="program-title">Our Programmes</h2>
                <p className="program-intro">
                    Programmes offered at WEUC are handled by five Faculties namely Business Administration, Computer Science, Education, Health Sciences and Social Sciences.
                </p>

                <div className="faculty-container">
                    <div className="left-faculties">
                        <div className="faculty">
                            <h3>(a) Faculty of Business Administration</h3>
                            <ul>
                                <li>B.Sc. Accounting</li>
                                <li>B.Sc. Banking and Finance</li>
                                <li>B.Sc. Human Resource</li>
                                <li>B.Sc. Marketing</li>
                            </ul>
                        </div>

                        <div className="faculty">
                            <h3>(b) Faculty of Computer Studies</h3>
                            <ul>
                                <li>B.Sc. Computer Science</li>
                                <li>B.Sc. Information & Communication Technology</li>
                                <li>B.Sc. Computational Finance</li>
                            </ul>
                        </div>

                        <div className="faculty">
                            <h3>(c) Faculty of Education</h3>
                            <ul>
                                <li>B.Ed. Basic Education</li>
                                <li>B.Ed. Early Childhood Education</li>
                                <li>B.Ed. Management</li>
                            </ul>
                        </div>
                    </div>

                    <div className="right-faculties">
                        <div className="faculty">
                            <h3>(d) Faculty of Health Sciences</h3>
                            <ul>
                                <li>B.Sc. Nursing</li>
                            </ul>
                        </div>

                        <div className="faculty">
                            <h3>(e) Faculty of Social Sciences</h3>
                            <ul>
                                <li>B.Sc. Entrepreneurship</li>
                                <li>B.A Corporate Administration</li>
                                <li>B.Sc. Procurement & Supply Chain Management</li>
                            </ul>
                        </div>

                        <div className="faculty">
                            <h3>(f) New Programmes being developed</h3>
                            <ul>
                                <li>M.Sc. Criminal Justice Administration</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Program;
