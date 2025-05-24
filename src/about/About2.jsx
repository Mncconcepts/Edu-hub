import React, { useEffect, useState, useRef } from "react";
import "./About2.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const aboutContent = [
    {
        title: "ABOUT WEUC",
        text: "West End University College (WEUC) is a forward-focused independent, non-denominational, a co-educational tertiary institution established in 2010. It is situated in the West End of Accra, the capital of Ghana. It has an urban setting location at Ngleshie-Amanfro, off the Weija-Kasoa Highway, about 30 kilometres from the city of Accra. The University College which is accredited by the National Accreditation Board (NAB) of the Ministry of Education and affiliated to the University of Cape Coast (UCC) was incorporated under the Ghana Companies Code 1963 (Act 179) on January 21, 2010.",
    },
    {
        title: "OUR VALUE",
        text: "Extending values beyond the classroom by making sure skills and concepts taught in the classroom are authentically useful in the world beyond school",
    },
    {
        title: "VISION",
        text: "The vision of WEUC is to be an innovative top-class University College bridging the gap between industry and academia.",
    },
    {
        title: "OUR MISSION",
        text: "WEUCs mission is to respond to the educational and technical needs of our society through an array of comprehensive programmes and services that facilitate learning, research and outreach activities aimed at fostering effective leadership, organizational change, innovation and social stewardship. Offering a multicultural and friendly environment in which students can successfully learn basic skills and core academic content, develop their special talents and social competencies.",
    },
    {
        title: "OUR STRATEGY",
        text: "Offering a multicultural and friendly environment in which students can successfully learn basic skills and core academic content, develop their special talents and social competencies."
    }
];

const statsData = [
    { number: 50, text: "PROFESSIONAL INSTRUCTORS" },
    { number: 25, text: "PROGRAMMES" },
    { number: 300, text: "NEW COURSES" },
    { number: 10, text: "YEARS EXPERIENCE" }
];
const aboutImages = [
    "/places1.png",
    "/places4.jpeg",
    "/places5.jpg",
    "/places2.jpg",
    "/places3.jpeg"
];

const About2 = () => {
    const [counts, setCounts] = useState(statsData.map(() => 0));
    const statsRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        const observerCallback = (entries) => {
            if (entries[0].isIntersecting) {
                statsData.forEach((stat, index) => {
                    let start = 0;
                    const end = stat.number;
                    const duration = 2000;
                    const stepTime = Math.abs(Math.floor(duration / end));

                    const timer = setInterval(() => {
                        start += 1;
                        setCounts((prevCounts) => {
                            const newCounts = [...prevCounts];
                            newCounts[index] = start;
                            return newCounts;
                        });

                        if (start === end) clearInterval(timer);
                    }, stepTime);
                });

                observerRef.current.connect();
            }
        };

        observerRef.current = new IntersectionObserver(observerCallback, {
            threshold: 0.5
        });

        if (statsRef.current) {
            observerRef.current.observe(statsRef.current);
        }

        return () => observerRef.current?.disconnect();
    }, []);

    return (
        <div className="aboutt-container">
            <div className="aboutt-header"></div>

            {/* Main two-column section */}
            <div className="aboutt-section-row">
                <div data-aos="fade-up" className="aboutt-left">
                    {aboutContent.map((item, index) => (
                        <div className="aboutt-text" key={index}>
                            <h2 data-aos="fade-right" className="" >{item.title}</h2>
                            <p>{item.text}</p>
                        </div>
                    ))}
                    <Link to="/admission">
                    <button className="btnn font-bold" type="submit">Apply Now</button>
                    </Link>
                </div>

                <div data-aos="zoom-in" className="aboutt-right">
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.1909317282084!2d-0.379259!3d5.558631000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfe0fdf602b3d9e3%3A0x45f9473c8d19dc77!2sWest%20End%20University%20College!5e0!3m2!1sen!2sgh!4v1644151227900!5m2!1sen!2sgh"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>

                    <div data-aos="fade-up" className="map-card bg-light">
                        <p>
                            West End University College is not just a school; it's a vision for the future.
                            With years of dedication to academic excellence and student development, we believe
                            in transforming lives through quality education, community engagement, and industry-driven innovation.
                            This card is a testament to our values, heritage, and commitment to national development.
                            Whether you're a student, educator, or partner, there's always a place for you in our mission.
                            West End University College is not just a school; it's a vision for the future.
                            With years of dedication to academic excellence and student development, we believe
                            in transforming lives through quality education, community engagement, and industry-driven innovation.
                            This card is a testament to our values, heritage, and commitment to national development.
                            Whether you're a student, educator, or partner, there's always a place for you in our mission.
                            West End University College is not just a school; it's a vision for the future.
                            With years of dedication to academic excellence and student development, we believe
                            in transforming lives through quality education, community engagement, and industry-driven innovation.
                            This card is a testament to our values, heritage, and commitment to national development.
                            Whether you're a student, educator, or partner, there's always a place for you in our mission.
                        </p>
                    </div>
                </div>
            </div>

            {/* Image Gallery Section */}
            <div data-aos="fade-up" className="Course-section">
                <div className="course-text">
                    <h2 className="font-bold mt-5 text-center">CERTIFICATE COURSES</h2>
                    <div className="arrow">
                        <FaArrowLeft size={20} />
                        <FaArrowRight size={20} />
                    </div>
                </div>
            </div>

            <div className="Course-section-2">
                <div className="overlay"></div>

                <div data-aos="zoom-in" className="center-image">
                    <div className="youtube-icon ms-1">
                        <img src="/youtube1.png" alt="YouTube" />
                        <p className="text-white">Watch Video</p>
                    </div>
                </div>
            </div>

            {/* Image Gallery Section */}
            <div data-aos="zoom-in" className="about-gallery bg-light">
                {aboutImages.map((image, index) => (
                    <img key={index} src={image} alt={`Gallery ${index + 1}`} />
                ))}
            </div>

            {/* Stats Section */}
            <div className="about-stats" ref={statsRef}>
                {statsData.map((stat, index) => (
                    <div key={index} className="statt-item">
                        <h2>{counts[index]}</h2>
                        <p>{stat.text}</p>
                    </div>
                ))}
            </div>
            <div data-aos="zoom-in" className="management bg-light">
                <h2>MANAGEMENT</h2>
                <div className="management-scroll">
                    {aboutImages.map((image, index) => (
                        <img key={index} src={image} alt={`Gallery ${index + 1}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About2;
