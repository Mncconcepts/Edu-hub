import React, { useState } from 'react';
import './News.css';
import { FaHeart, FaRegComment, FaRetweet } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const newsItems = [
    {
        date: '20 Jan',
        year: '2025',
        title: '2024/2025 ADMISSION IN PROGRESS',
        description: 'Available Programmes: BSc. Nursing (4 years), BSc. Nursing (2 years top-up) and Diploma in Nursing (Weekend option), BSc. Accounting/BCom',
        img: null,
        link: '#'
    },
    {
        date: '15 May',
        year: '2025',
        title: 'Ghanas environmental devastation can be resolved through time-tested religious practices - Prof Awauh-Nyamekye',
        description: 'Lecture hosted by the Department of Religion and Human Values at University of Cape Coast (UCC).',
        img: '/places2.jpg',
        link: '#'
    },
    {
        date: '10 Apr',
        year: '2025',
        title: 'New global book published on the perspective of COVID-19 across Africa',
        description: 'New book explores the perspective of COVID-19 across Africa by various scholars in health-related fields.',
        img: '/places3.jpeg',
        link: '#'
    },
    {
        date: '25 Apr',
        year: '2025',
        title: 'Graduation Ceremony Highlights',
        description: 'West End University College celebrates its recent batch of graduates at a colorful ceremony.',
        img: '/places4.jpeg',
        link: '#'
    },
    {
        date: '25 Apr',
        year: '2025',
        title: 'Graduation Ceremony Highlights',
        description: 'West End University College celebrates its recent batch of graduates at a colorful ceremony.',
        img: '/places5.jpg',
        link: '#'
    },
];

const News = () => {
    const [likes, setLikes] = useState(Array(newsItems.length).fill(0));
    const [comments, setComments] = useState(Array(newsItems.length).fill(''));
    const [showComments, setShowComments] = useState(Array(newsItems.length).fill(false));

    const handleLike = (index) => {
        const updatedLikes = [...likes];
        updatedLikes[index]++;
        setLikes(updatedLikes);
    };

    const handleCommentChange = (e, index) => {
        const updatedComments = [...comments];
        updatedComments[index] = e.target.value;
        setComments(updatedComments);
    };

    const toggleCommentBox = (index) => {
        const updated = [...showComments];
        updated[index] = !updated[index];
        setShowComments(updated);
    };

    const handleRepost = (index) => {
        alert(`Reposted: "${newsItems[index].title}"`);
    };

    return (
        <div className="about-container">
            <div className="about-header">
                <div className="about-header-content">
                    <h1>NEWS PAGE</h1>
                    <p>West End University College - news1</p>
                </div>
            </div>
            {newsItems.map((item, index) => (
                <div  data-aos="fade-up"className="news-card" key={index}>
                    <div className="news-date">
                        <span className="news-day">{item.date}</span>
                        <span className="news-year">{item.year}</span>
                    </div>
                    {item.img && <img src={item.img} alt={item.title} className="news-image" />}
                    <div className="news-content">
                        <h3 className="news-title">{item.title}</h3>
                        <p className="news-desc">{item.description}</p>
                        <Link to="/singlenews" className="news-link">Read More</Link>

                        <div className="reaction-iccons">
                            <button onClick={() => handleLike(index)} className="iccon-btn">
                                <FaHeart className="iccon like" /> <span>{likes[index]}</span>
                            </button>
                            <button onClick={() => toggleCommentBox(index)} className="iccon-btn">
                                <FaRegComment className="iccon comment" />
                            </button>
                            <button onClick={() => handleRepost(index)} className="iccon-btn">
                                <FaRetweet className="iccon repost" />
                            </button>
                        </div>

                        {showComments[index] && (
                            <div className="comment-box">
                                <textarea
                                    placeholder="Write a comment..."
                                    value={comments[index]}
                                    onChange={(e) => handleCommentChange(e, index)}
                                />
                                <button className="comment-btn">Post</button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default News;
