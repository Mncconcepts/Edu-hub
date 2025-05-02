import React, { useEffect, useState } from 'react';
import './About3.css';

const About3 = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => console.error('Error loading product data:', error));
  }, []);

  const posts = productData.slice(0, 4);
  const certificates = productData.slice(4);

  return (
    <div className="aabout-container bg-light">
      <div className="posts-section">
        <h2 data-aos="fade-up" className=''>LATEST POST</h2>
        {posts.map((post) => (
          <div data-aos="zoom-in" className="post" key={post.id}>
            <img src={post.image} alt={post.title} />
            <div>
              <h4>{post.title}</h4>
              <p className="date">{post.date}</p>
              <p>{post.description}</p>
            </div>
          </div>
        ))}
        <button className='btnn mt-3 text-white' type='submit'>View All</button>
      </div>

      <div className="certificate-section">
        <h2 data-aos="fade-up" className=''>CERTIFICATE PROGRAMME</h2>
        {certificates.map((cert) => (
          <div data-aos="zoom-in" key={cert.id}>
            <img src={cert.image} alt={cert.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default About3;
