import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { portfolioItems } from '../data/portfolioData';
import '../styles/portfolio-item.css';
import ProcessHeading from './ProcessHeading';

export default function PortfolioItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  // find the item or fallback
  const item = portfolioItems.find((i) => i.id === id) || portfolioItems[0];
  // destructure images: first for hero, rest for carousel
  const [heroImage, ...carouselImages] = item.images;

  const carouselRef = useRef(null);
  const scroll = (dir) => {
    if (!carouselRef.current) return;
    const viewWidth = carouselRef.current.clientWidth;
    carouselRef.current.scrollBy({ left: dir * viewWidth, behavior: 'smooth' });
  };

  return (
    <div className="portfolio-item-detail-page">
      <ProcessHeading
        foregroundText='PROJECT JOURNEY'
        backgroundText='OUR IMPACT'
      />
      <div className="portfolio-item-detail-hero">
        <div className="portfolio-item-detail-image">
          <img src={heroImage} alt={item.title} />
        </div>
        <div className="portfolio-item-detail-info">
          <button
            className="portfolio-item-back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <h1>{item.title.toUpperCase()}</h1>
          <div className="portfolio-item-underline" />
          <div className="portfolio-item-meta">
            <div>
              <h4>Client:</h4>
              <p>{item.title}</p>
            </div>
            <div>
              <h4>Industry:</h4>
              <p>{item.category}</p>
            </div>
            <div>
              <h4>Services:</h4>
              <p>
                Digital Marketing Consulting + Website Design and Development +
                Social Media Marketing + Lead Generation + Campaign Planning and
                Execution
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="portfolio-item-section-title">
        {item.title.toUpperCase()}'S GALLERY
      </h2>

      <div className="portfolio-item-related-carousel-wrapper">
        <button
          className="portfolio-item-arrow left"
          onClick={() => scroll(-1)}
        >
          ‹
        </button>
        <div
          className="portfolio-item-related-carousel"
          ref={carouselRef}
        >
          {carouselImages.map((src, idx) => (
            <div className="portfolio-item-carousel-item" key={idx}>
              <img src={src} alt={`${item.title} ${idx + 2}`} />
            </div>
          ))}
        </div>
        <button
          className="portfolio-item-arrow right"
          onClick={() => scroll(1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
