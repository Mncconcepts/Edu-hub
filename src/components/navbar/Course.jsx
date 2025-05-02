import React, { useEffect, useState } from "react";
import "./Course.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faBullseye,
    faBookOpen,
    faQuestionCircle,
    faUsers,
    faThLarge,
    faList,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Course = () => {
    const currentPage = 1;
    const productsPerPage = 5;

    const [courses, setCourses] = useState([]);
    const [viewMode, setViewMode] = useState("horizontal");
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;

    useEffect(() => {
        fetch("/products2.json")
            .then((res) => res.json())
            .then((data) => {
                const courseList = data;
                setCourses(courseList);
            });
    }, []);

    const visibleCourses = courses.slice(0, 5);

    const toggleViewMode = () => {
        setViewMode(viewMode === "horizontal" ? "vertical" : "horizontal");
    };

    return (
        <div className="about-container">
            <div className="about-header">
                <div className="about-header-content">
                    <h1>Certificate Courses</h1>
                    <p>Bridging Academia & Industry</p>
                </div>
            </div>

            <div className="course-top-bar">
                <h3>
                    Showing {indexOfFirst + 1}-{Math.min(indexOfLast, courses.length)} of {courses.length} results
                </h3>

                <div className="view-filters">
                    <select>
                        <option>Newly published</option>
                        <option>Oldest</option>
                    </select>
                </div>
            </div>

            <div className="search-box">
                <input type="text" placeholder="Search courses..." />
                <button>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            <div className={`course-list ${viewMode}`}>
                {visibleCourses.map((course) => (
                    <div data-aos="zoom-in" className={`course-card ${viewMode}`} key={course.id}>
                        <img src={course.image} alt={course.title} className="course-thumbnail" />
                        <div className="course-content">
                            <h3 className="mt-3">{course.title}</h3>
                            <p className="by">
                                by <span>{course.author}</span> in {course.category?.join(", ")}
                            </p>
                            <div className="meta">
                                <span>
                                    <FontAwesomeIcon icon={faClock} /> {course.duration}
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faBullseye} /> {course.level}
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faBookOpen} /> {course.lessons} Lessons
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faQuestionCircle} /> {course.quizzes} Quizzes
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faUsers} /> {course.students} Students
                                </span>
                            </div>
                            <p className="desc">{course.description}</p>
                            <div className="bottom">
                                <strong>{course.price}</strong>
                                <button className="read-btn">Read more</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="course-footer-links">
                <a href="#">FAQ</a>
                <a href="#">About Us</a>
                <a href="#">My Profile</a>
            </div>
        </div>
    );
};

export default Course;
