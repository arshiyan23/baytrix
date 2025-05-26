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

  // Track visibility using IntersectionObserver
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

    Object.values(containersRef.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Highlight logic based on visible items
  useEffect(() => {
    const visibleKeys = Object.entries(visibleEntries)
      .filter(([_, isVisible]) => isVisible)
      .map(([key]) => key);

    if (visibleKeys.length === 0) return;

    const randomKey = visibleKeys[Math.floor(Math.random() * visibleKeys.length)];
    const [row, index] = randomKey.split('-');

    setHighlightedIndex(parseInt(index));
    setHighlightedRow(row);

    const timer = setTimeout(() => {
      setHighlightedIndex(null);
      setHighlightedRow(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [visibleEntries]);

  return (
    <div className="gallery-wrapper">
      <ProcessHeading
        backgroundText="SHOWCASE"
        foregroundText="CREATIVE HIGHLIGHTS"
        foregroundTextColor="white"
        backgroundTextFill="#7349ac"
        description="Discover a selection of our standout projects, showcasing creativity and impactful results. See how we turn ideas into reality."
      />

      {/* Top Row */}
      <div
        className={`image-row-wrapper top ${hoveredRow === 'top' ? 'paused' : ''}`}
        onMouseLeave={() => setHoveredRow(null)}
      >
        <div className="image-row">
          {[...topImages, ...topImages].map((src, idx) => {
            const trueIdx = idx % topImages.length;
            const key = `top-${trueIdx}`;
            const isHighlighted = highlightedRow === 'top' && trueIdx === highlightedIndex;

            return (
              <div
                key={key + '-' + idx}
                data-key={key}
                ref={(el) => (containersRef.current[`${key}-${idx}`] = el)}
                className={`image-container ${isHighlighted ? 'highlight' : ''}`}
                onClick={() => navigate('/portfolio')}
                onMouseEnter={() => setHoveredRow('top')}
              >
                <img src={src} alt={`top-${idx}`} />
                {(hoveredRow === 'top' || isHighlighted) && (
                  <button className="view-more-btn">View More</button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Row */}
      <div
        className={`image-row-wrapper bottom ${hoveredRow === 'bottom' ? 'paused' : ''}`}
        onMouseLeave={() => setHoveredRow(null)}
      >
        <div className="image-row reverse">
          {[...bottomImages, ...bottomImages].map((src, idx) => {
            const trueIdx = idx % bottomImages.length;
            const key = `bottom-${trueIdx}`;
            const isHighlighted = highlightedRow === 'bottom' && trueIdx === highlightedIndex;

            return (
              <div
                key={key + '-' + idx}
                data-key={key}
                ref={(el) => (containersRef.current[`${key}-${idx}`] = el)}
                className={`image-container ${isHighlighted ? 'highlight' : ''}`}
                onClick={() => navigate('/portfolio')}
                onMouseEnter={() => setHoveredRow('bottom')}
              >
                <img src={src} alt={`bottom-${idx}`} />
                {(hoveredRow === 'bottom' || isHighlighted) && (
                  <button className="view-more-btn">View More</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GalleryScroller;
