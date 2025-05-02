import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SingleNews.css';

const SingleNews = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/newsData.json')
            .then(res => res.json())
            .then(data => {
                setNewsItems(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching news data:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    const index = parseInt(id, 10);

    if (isNaN(index) || index < 0 || index >= newsItems.length) {
        return (
            <div className="about-container">
                <div className="about-header">
                    <h1>News Not Found</h1>
                    <p>No news post exists with the given ID.</p>
                    <button className="back-btn" onClick={() => navigate(-1)}>← Go Back</button>
                </div>
            </div>
        );
    }

    const news = newsItems[index];

    return (
        <div className="about-container">
            <div className="about-header">
                <div className="about-header-content">
                    <h1>Single News Post</h1>
                    <p>West End University College - single news post</p>
                </div>
            </div>
            <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
            <div className="single-news-card">
                <div className="news-date">
                    <span className="news-day">{news.date}</span>
                    <span className="news-year">{news.year}</span>
                </div>
                {news.img && <img src={news.img} alt={news.title} className="news-image" />}
                <div className="news-content">
                    <h2 className="news-title">{news.title}</h2>
                    <p className="news-desc">{news.description}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleNews;
