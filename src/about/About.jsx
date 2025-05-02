import React, { useEffect, useState, useRef } from "react";
import "./About.css";
import Reviews from "../components/navbar/Reviews";

const aboutContent = [
    {
        title: "Who We Are",
        text: "West End University College (WEUC) is a forward-focused independent, non-denominational, a co-educational tertiary institution established in 2010. It is situated in the West End of Accra, the capital of Ghana. It has an urban setting location at Ngleshie-Amanfro, off the Weija-Kasoa Highway, about 30 kilometres from the city of Accra. The University College which is accredited by the National Accreditation Board (NAB) of the Ministry of Education and affiliated to the University of Cape Coast (UCC) was incorporated under the Ghana Companies Code 1963 (Act 179) on January 21, 2010.",
    },
    {
        title: "Mission Statement",
        text: "WEUCs mission is to respond to the educational and technical needs of our society through an array of comprehensive programmes and services that facilitate learning, research and outreach activities aimed at fostering effective leadership, organizational change, innovation and social stewardship.",
    },
    {
        title: "Our Commitments",
        text: "Open access to high-quality, affordable education aimed at preparing students for easy access to the current competitive job market. Life-long learning to heighten the awareness of students to multiple paths for career advancement and also helping them pursue the choices most conducive to their individual needs. International collaboration and linkages for proactive responsiveness to develop cutting-edge programmes that meet the .changing needs of students and industry with the view to contributing to the economic, civic and cultural vitality of Ghana and the international community. A comprehensive array of programmes and services recognized for excellence by leaders of business, industry, and government as well as educators in national and international spheres",
    },
    {
        title: "Our Vision",
        text: "The vision of WEUC is to be an innovative top-class University College bridging the gap between industry and academia.",
    },
    {
        title: "Faculties",
        text: "WEUC as a young institution can boost of modest but the state-of-the-art facilities to enhance learning and research as well as making life in the University College very conducive for students."
    },
    {
        title: "Founders vision",
        text: "After a long successful career in Ghana and across many parts of Africa with many years of training in leading multi-national firms, I gained an in-depth insight into some of the barriers that impede excellence and breakthrough in Ghana and Africa’s socio-economic challenges such as unemployment, poor health care and low productivity in business and state enterprises. It is on the basis of the foregoing reasons that I nurtured the ambition to establish an institution of higher education that would emphasize excellence in entrepreneurship and leadership in areas of academic pursuit. My objective for WEUC is to produce a pedigree of visionary graduates that will adequately respond to present and future challenges in business, science and Information and Communication technology."
    }
];

const aboutImages = [
    "/places1.png",
    "/places4.jpeg",
    "/places5.jpg",
    "/places2.jpg",
    "/places3.jpeg"
];

const statsData = [
    { number: 50, text: "PROFESSIONAL INSTRUCTORS" },
    { number: 300, text: "NEW COURSES " },
    { number: 25, text: "PROGRAMMES" },
    { number: 10, text: "YEARS EXPERIENCE" }
];

const About = () => {
    const [counts, setCounts] = useState(statsData.map(() => 0));
    const statsRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        const observerCallback = (entries) => {
            if (entries[0].isIntersecting) {
                statsData.forEach((stat, index) => {
                    let start = 0;
                    const end = stat.number;
                    const duration = 2000; // 2 seconds
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
        <div className="about-container">
            <div className="about-header">
                <div data-aos="zoom-in" className="about-header-content">
                    <h1>ABOUT US</h1>
                    <p>Bridging Academia & Industry</p>
                </div>
            </div>

            {Array.from({ length: aboutContent.length / 2 }, (_, i) => (
                <div
                    key={i}
                    className={`about-section ${i % 2 === 0 ? "text-left" : "text-right"}`}
                >
                    <div className="about-text-group">
                        <div data-aos="fade-up" className="about-text">
                            <h2>{aboutContent[i * 2].title}</h2>
                            <p>{aboutContent[i * 2].text}</p>
                        </div>
                        <div data-aos="fade-up" className="about-text">
                            <h2>{aboutContent[i * 2 + 1].title}</h2>
                            <p>{aboutContent[i * 2 + 1].text}</p>
                        </div>
                    </div>
                    <div data-aos="zoom-in" className="about-image">
                        <img src={aboutImages[i]} alt={`Section ${i + 1}`} />
                    </div>
                </div>
            ))}

            {/* Image Gallery Section */}
            <div data-aos="zoom-in" className="about-gallery bg-light">
                {aboutImages.map((image, index) => (
                    <img key={index} src={image} alt={`Gallery ${index + 1}`} />
                ))}
            </div>

            {/* Stats Section */}
            <div className="about-stats" ref={statsRef}>
                {statsData.map((stat, index) => (
                    <div key={index} className="stat-item">
                        <h2>{counts[index]}</h2>
                        <p>{stat.text}</p>
                    </div>
                ))}
            </div>
            <Reviews/>
        </div>
    );
};

export default About;
