import React, { useState, useEffect, useRef } from 'react';
import '../styles/gallery-scroller.css';
import ProcessHeading from './ProcessHeading';
import { useNavigate } from 'react-router-dom';

const topImages = [
  '/assets/portfolio/kartspace/kartspace-electronicspage.png',
  '/assets/portfolio/poster.jpeg',
  '/assets/portfolio/tradewise/tradewise-chat.png',
  '/assets/portfolio/fitlife-homepage.png',
  '/assets/portfolio/crm.png',
];

const bottomImages = [
  '/assets/portfolio/kartspace/kartspace-fruits-page.png',
  '/assets/portfolio/tradewise/tradewise-homepage.png',
  '/assets/portfolio/bottles.png',
  '/assets/portfolio/gowash.png',
  '/assets/portfolio/feedback-central.png',
];

const GalleryScroller = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [visibleEntries, setVisibleEntries] = useState({});
  const containersRef = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const updated = { ...visibleEntries };
        entries.forEach((entry) => {
          const key = entry.target.getAttribute('data-key');
          updated[key] = entry.isIntersecting;
        });
        setVisibleEntries(updated);
      },
      { threshold: 0.5 }
    );

    Object.values(containersRef.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const visibleKeys = Object.entries(visibleEntries)
      .filter(([_, v]) => v)
      .map(([k]) => k);
    if (!visibleKeys.length) return;

    const randomKey = visibleKeys[Math.floor(Math.random() * visibleKeys.length)];
    const [row, idx] = randomKey.split('-');

    setHighlightedRow(row);
    setHighlightedIndex(parseInt(idx));

    const timer = setTimeout(() => {
      setHighlightedRow(null);
      setHighlightedIndex(null);
    }, 1000);
    return () => clearTimeout(timer);
  }, [visibleEntries]);

  return (
    <div className="gallery-wrapper">
      <ProcessHeading
        backgroundText="SHOWCASE"
        foregroundText="CREATIVE HIGHLIGHTS"
        backgroundTextFill="#f5f0ff"
        description="Discover a selection of our standout projects, showcasing creativity and impactful results. See how we turn ideas into reality."
      />

      {/* Top Row */}
      <div
        className={`image-row-wrapper top ${hoveredRow === 'top' ? 'paused' : ''}`}
        onMouseEnter={() => setHoveredRow('top')}
        onMouseLeave={() => setHoveredRow(null)}
      >
        <div className="image-row">
          {[...topImages, ...topImages].map((src, idx) => {
            const trueIdx = idx % topImages.length;
            const key = `top-${trueIdx}`;
            const isHighlighted = highlightedRow === 'top' && trueIdx === highlightedIndex;

            return (
              <div
                key={`${key}-${idx}`}
                data-key={key}
                ref={el => (containersRef.current[`${key}-${idx}`] = el)}
                className={`image-wrapper ${isHighlighted ? 'highlight' : ''}`}
                onClick={() => navigate('/portfolio')}
                onMouseEnter={() => setHoveredRow('top')}
              >
                <div className="image-container">
                  <img src={src} alt={`top-${idx}`} />
                  {(hoveredRow === 'top' || isHighlighted) && (
                    <button className="view-more-btn">View More</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Row */}
      <div
        className={`image-row-wrapper bottom ${hoveredRow === 'bottom' ? 'paused' : ''}`}
        onMouseEnter={() => setHoveredRow('bottom')}
        onMouseLeave={() => setHoveredRow(null)}
      >
        <div className="image-row reverse">
          {[...bottomImages, ...bottomImages].map((src, idx) => {
            const trueIdx = idx % bottomImages.length;
            const key = `bottom-${trueIdx}`;
            const isHighlighted = highlightedRow === 'bottom' && trueIdx === highlightedIndex;

            return (
              <div
                key={`${key}-${idx}`}
                data-key={key}
                ref={el => (containersRef.current[`${key}-${idx}`] = el)}
                className={`image-wrapper ${isHighlighted ? 'highlight' : ''}`}
                onClick={() => navigate('/portfolio')}
                onMouseEnter={() => setHoveredRow('bottom')}
              >
                <div className="image-container">
                  <img src={src} alt={`bottom-${idx}`} />
                  {(hoveredRow === 'bottom' || isHighlighted) && (
                    <button className="view-more-btn">View More</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GalleryScroller;
