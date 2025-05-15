import React, { useState } from 'react';
import '../styles/style.css';
import ProcessHeading from './ProcessHeading';

const imageList = [
  '/assets/port1.png',
  '/assets/port2.png',
  '/assets/port3.png',
  '/assets/port4.png',
  '/assets/port5.png',
  '/assets/port6.png',
];

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + imageList.length) % imageList.length
    );
  };

  return (
    <>
      <div className="portfolio-text">
        <ProcessHeading backgroundText="SUCCESS" foregroundText="OUR PORTFOLIO" foregroundTextColor='white' />
        <p>
          Explore a curated collection of projects we’ve proudly delivered — each
          tailored to elevate our clients’ digital presence.
        </p>
      </div>
      <div className="slider-wrapper">
        <div className="arrow-container">
          <button className="portfolio-scroll-button left" onClick={prevImage}>
            &#8592;
          </button>
        </div>

        <div
          className="portfolio-item"
          style={{ backgroundImage: `url(${imageList[currentIndex]})` }}
        >
          <div className="overlay">
            <button className="view-more">View More</button>
          </div>
        </div>

        <div className="arrow-container">
          <button className="portfolio-scroll-button right" onClick={nextImage}>
            &#8594;
          </button>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
