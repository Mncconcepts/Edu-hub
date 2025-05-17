import React from 'react';
import './Reviews.css';

const reviews = [
    { id: 1, name: 'John Doe', text: 'This educational platform completely transformed the way I learn! The courses are well-structured, engaging, and easy to follow. I have gained so much confidence in my skills and now feel better prepared for my career.', image: '/user1.png', rating: 5 },
    { id: 2, name: 'John Doe', text: 'I love how practical and interactive the lessons are. The daily quizzes and assignments help reinforce what I learn, and the instructors are always responsive and supportive. My learning experience has been fantastic!', image: '/user1.png', rating: 5 },
    { id: 3, name: 'John Doe', text: 'Finally found a learning platform that works for my pace and style. Highly recommended! The content is clear, and I appreciate being able to go back and review materials anytime I want. It is helped me stay motivated and consistent.', image: '/user1.png', rating: 4 },
    { id: 4, name: 'John Doe', text: 'Great support team and the personalized learning paths are incredibly helpful! I was unsure about where to start, but the guidance helped me choose the right courses. I am learning so much every day.', image: '/user1.png', rating: 4 },
    { id: 5, name: 'John Doe', text: 'I saw improvement in my understanding of complex subjects within weeks. These courses are a game changer! The teaching style and hands-on projects helped everything click for me.', image: '/user1.png', rating: 5 },
    { id: 6, name: 'John Doe', text: 'High-quality content and real-world applications. Im seriously impressed. The examples used in the lessons are relevant and useful, and I feel like I am gaining skills I can actually use in my job.', image: '/user1.png', rating: 4 },
];


const Reviews = () => {
    return (
        <div className='reviews-container'>
            <div data-aos="fade-down" className='reviews-header'>
                <h1>WHAT OUR STUDENTS SAY</h1>
            </div>
            <div className='reviews-slider'>
                {reviews.map((review) => (
                    <div key={review.id} className='review-card'>
                        <div className='review-content'>
                            <img src={review.image} alt={review.name} className='reviewer-image' />
                            <h4 className='reviewer-name'>- {review.name}</h4>
                            <small className='font-bold text-bold mb-4'>Student</small>
                            <p className='review-text'>"{review.text}"</p>
                            <div className='star-rating'>{'⭐'.repeat(review.rating)}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="partnership-section w-full">
                <div className="slidingg-text">
                    <h3>OUR PARTNERS: SUPPORTERS LOGOS AND OTHER EDUCATIONAL HUB LOGOS</h3>
                </div>
            </div>
        </div>
    );
};

export default Reviews;