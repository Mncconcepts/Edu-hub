import React from 'react';
import './News3.css';

const newsData = [
    {
        day: "24",
        month: "Jun",
        year: "2025",
        title: "M.Sc. CRIMINAL JUSTICE",
        description:
            "Do you work or intend working with the SECURITY AGENCIES? (Ghana Police Service, Ghana Armed Forces, Customs Excise Preventive Service, Ghana Immigration Service, Ghana Revenue Authority, Ghana Prison Service/Correction Officers and Private Security Firms) then earn…",
        time: "08:00 - 11:00 (October 19, 2025)",
        location: "Accra, Ghana"
    },
    {
        day: "18",
        month: "Oct",
        year: "2025",
        title:
            "WEST END UNIVERSITY COLLEGE IN COLLABORATIVE LINKAGE WITH FITCHBURG STATE UNIVERSITY MA, USA",
        description:
            "West End University College, Ghana has entered into a collaborative linkage programme with Fitchburg State University MA, U. S. A . A Memorandum of Understanding (MOU) has been signed between the two Institutions. A significant aspect…",
        time: "07:00 - 10:00 (November 18, 2025)",
        location: "Accra, Ghana"
    }
];

const News3 = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <div className="about-header-content">
                    <h1>NEWS EVENTS</h1>
                    <p>West End University College - newsevents</p>
                </div>
            </div>
            {newsData.map((item, index) => (
                <div className="news3-card" key={index}>
                    <div className="news3-date-box">
                        <div className="news3-date-top">
                            <div className="news3-dots">
                                <span className="dot" />
                                <span className="dot" />
                            </div>
                            <div className="news3-day">{item.day}</div>
                            <div className="news3-month">{item.month}</div>
                        </div>
                        <div className="news3-year">{item.year}</div>
                    </div>
                    <div className="news3-content">
                        <h3 className="news3-title">{item.title}</h3>
                        <p className="news3-desc">{item.description}</p>
                        <p className="news3-meta">
                            <span className="news3-time">{item.time}</span> |{" "}
                            <span className="news3-location">{item.location}</span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default News3;
