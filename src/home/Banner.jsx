import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Banner.css";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/places1.png",
    title: "Scholarship Facility",
    text: "Scholarships available for brilliant but needy students.",
    button: "Apply Now",
    link: "/admission"
  },
  {
    image: "/places2.jpg",
    title: "Skilled Lecturers",
    text: "Qualified lecturers with many years of teaching experience.",
    button: "Learn More",
    link: "/about"
  },
  {
    image: "/places5.jpg",
    title: "Book Library & Store",
    text: "A modern library with state-of-the-art technology.",
    button: "Explore Now",
    link: "/shop"
  },
  {
    image: "/places4.jpeg",
    title: "Practical Learning",
    text: "Gain hands-on experience in your field of study.",
    button: "Discover More",
    link: "/program"
  },
  {
    image: "/places5.jpg",
    title: "Career Support",
    text: "Get guidance to excel in your professional journey.",
    button: "Apply Now",
    link: "/admission"
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="banner-container">
      {/* Slide Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "visible" : "hidden"}`}
          style={{
            backgroundImage: `url(${slide.image})`,
          }}
        >
          {/* Overlay */}
          <div className="overlay"></div>

          {/* Text Content */}
          <div className="text-content">
            <h2>{slide.title}</h2>
            <p>{slide.text}</p>
            <Link to={slide.link}>
              <button>{slide.button}</button>
            </Link>
          </div>

          {/* Indicator Dots */}
          <div className="indicator-container">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`indicator-dot ${index === currentIndex ? "active" : ""}`}
              ></span>
            ))}
          </div>

        </div>
      ))}

      {/* Navigation Arrows */}
      <button onClick={prevSlide} className="nav-arrow left-arrow">
        <FaArrowLeft size={20} />
      </button>
      <button onClick={nextSlide} className="nav-arrow right-arrow">
        <FaArrowRight size={20} />
      </button>
    </div>
  );
};

export default Banner;
