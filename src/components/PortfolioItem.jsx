import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { portfolioItems } from '../data/portfolioData';
import '../styles/portfolio-item.css';

export default function PortfolioItem() {
  const { id } = useParams();
  const item = portfolioItems.find(i => i.id === id) || portfolioItems[0];
  const { title, category, description, images } = item;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const changeImage = newIndex => {
    setFading(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFading(false);
    }, 300);
  };

  const prevImage = () =>
    changeImage((currentIndex - 1 + images.length) % images.length);
  const nextImage = () =>
    changeImage((currentIndex + 1) % images.length);

  return (
    <div className="portfolio-item-detail-page">

      {/* left: carousel */}
      <div className="carousel-section">
        <div className="carousel-wrapper">
          <button className="arrow-button left" onClick={prevImage}>‹</button>
          <img
            key={currentIndex}
            className={`main-image ${fading ? 'fade-out' : 'fade-in'}`}
            src={images[currentIndex]}
            alt={`${title} screenshot ${currentIndex + 1}`}
          />
          <button className="arrow-button right" onClick={nextImage}>›</button>
        </div>
        <div className="thumbnails">
          {images.map((src, idx) => (
            <img
              key={idx}
              className={`thumbnail ${currentIndex === idx ? 'active' : ''}`}
              src={src}
              alt={`${title} thumb ${idx + 1}`}
              onClick={() => changeImage(idx)}
            />
          ))}
        </div>
      </div>

      {/* right: project info */}
      <div className="info-section">
        <div className="case-study-label">Case Study</div>
        <h1 className="portfolio-item-title">{title}</h1>
        <p className="portfolio-item-category">{category}</p>
        <div className="portfolio-item-description">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
