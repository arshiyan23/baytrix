import React, { useState, useEffect } from 'react';
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
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const row = Math.random() > 0.5 ? 'top' : 'bottom';
      const length = row === 'top' ? topImages.length : bottomImages.length;
      const index = Math.floor(Math.random() * length);
      setHighlightedIndex(index);
      setHighlightedRow(row);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gallery-wrapper">
      <ProcessHeading
        backgroundText="SHOWCASE"
        foregroundText="CREATIVE HIGHLIGHTS"
        foregroundTextColor='white'
        backgroundTextFill='#7349ac'
        description='Discover a selection of our standout projects, showcasing creativity and impactful results. See how we turn ideas into reality.'
      />

      {/* Top Row */}
      <div
        className={`image-row-wrapper top ${hoveredRow === 'top' ? 'paused' : ''}`}
        onMouseLeave={() => setHoveredRow(null)}
      >
        <div className="image-row">
          {[...topImages, ...topImages].map((src, idx) => {
            const trueIdx = idx % topImages.length;
            const isHighlighted = highlightedRow === 'top' && trueIdx === highlightedIndex;
            return (
              <div
                key={`top-${idx}`}
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
            const isHighlighted = highlightedRow === 'bottom' && trueIdx === highlightedIndex;
            return (
              <div
                key={`bottom-${idx}`}
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
