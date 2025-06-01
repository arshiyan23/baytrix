import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { portfolioItems } from '../data/portfolioData';
import '../styles/portfolio-item.css';

export default function PortfolioItem() {
  const { id } = useParams();
  const item = portfolioItems.find((i) => i.id === id) || portfolioItems[0];
  const { title, category, description, images } = item;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const [showCalendly, setShowCalendly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const thumbnailsContainerRef = useRef(null);

  // -------------- Carousel Controls --------------
  const changeImage = (newIndex) => {
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

  // -------------- Calendly Controls --------------
  const handleCalendlyClick = () => {
    setShowCalendly(true);
    setIsLoading(true);
  };

  // -------------- Thumbnails Auto-Scroll --------------
  // Each thumbnail is 80px wide, gap is 16px. Container visible width = 3*80 + 2*16 = 272px.
  useEffect(() => {
    const container = thumbnailsContainerRef.current;
    if (!container) return;
    const thumbWidth = 80;
    const gap = 16;
    // Calculate how many pixels to scroll so that current thumbnail is centered
    // ScrollLeft = max(0, (index - 1) * (thumbWidth + gap))
    const raw = (currentIndex - 1) * (thumbWidth + gap);
    const scrollTo = Math.max(0, raw);
    container.scrollTo({ left: scrollTo, behavior: 'smooth' });
  }, [currentIndex]);

  return (
    <div className="port-itm-detail-page">
      {/* ─── Left: Carousel ───────────────────────────────────────────── */}
      <div className="port-itm-carousel-section">
        <div className="port-itm-carousel-wrapper">
          <button className="port-itm-arrow-button left" onClick={prevImage}>
            ‹
          </button>
          <img
            key={currentIndex}
            className={`port-itm-main-image ${fading ? 'port-itm-fade-out' : 'port-itm-fade-in'
              }`}
            src={images[currentIndex]}
            alt={`${title} screenshot ${currentIndex + 1}`}
          />
          <button className="port-itm-arrow-button right" onClick={nextImage}>
            ›
          </button>
        </div>

        {/* ─── 5. Thumbnails (exactly 3 visible; auto-scroll on index change) ────────── */}
        <div className="port-itm-thumbnails-wrapper">
          <div
            className="port-itm-thumbnails-container"
            ref={thumbnailsContainerRef}
          >
            <div className="port-itm-thumbnails">
              {images.map((src, idx) => (
                <div key={idx} className="port-itm-thumb-wrapper">
                  <img
                    className={`port-itm-thumbnail ${currentIndex === idx ? 'active' : ''}`}
                    src={src}
                    alt={`${title} thumb ${idx + 1}`}
                    onClick={() => changeImage(idx)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Fade overlay if a 4th thumbnail exists */}
          {images.length > 3 && currentIndex < images.length - 1 && (
            <div className="port-itm-thumb-fade" />
          )}
        </div>

      </div>

      {/* ─── Right: Info + “Ready to Grow” ───────────────────────────────── */}
      <div className="port-itm-info-section">
        {/* Top Info Card */}
        <div className="port-itm-info-card">
          <h1 className="port-itm-title">{title}</h1>
          <p className="port-itm-category">{category}</p>
          <div className="port-itm-description">
            <p>{description}</p>
          </div>
        </div>

        {/* “Ready to Grow” Section (static, no animation) */}
        <div className="port-itm-calendly-card">
          <img
            src="/assets/booking.webp"
            alt="Schedule Illustration"
            className={`port-itm-calendar-img ${showCalendly ? 'hidden' : ''}`}
          />

          <h2 className="port-itm-title">Ready to Grow? Let’s Talk!</h2>
          <p className="port-itm-subtitle">
            Book a free 30-mins strategy call today—choose a slot below.
          </p>

          <div className="port-itm-calendar-section">
            {!showCalendly && (
              <div
                className="port-itm-calendar-placeholder"
                onClick={handleCalendlyClick}
              >
                📅 CLICK TO BOOK A TIME SLOT
              </div>
            )}

            {showCalendly && isLoading && <div className="port-itm-spinner" />}

            {showCalendly && (
              <div
                className="port-itm-calendar-embed-container"
                style={{ opacity: loaded ? 1 : 0 }}
              >
                <iframe
                  src="https://calendly.com/baytix-net/30min"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  title="Calendly Scheduler"
                  style={{ border: 'none', minWidth: '320px' }}
                  onLoad={() => {
                    setLoaded(true);
                    setIsLoading(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
