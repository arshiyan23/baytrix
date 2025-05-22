import React, { useState } from 'react';
import '../styles/gallery-scroller.css';
import ProcessHeading from './ProcessHeading';
import { useNavigate } from 'react-router-dom';

const topImages = [
  '/assets/portfolio/1.jpg', '/assets/portfolio/chat-app.png', '/assets/portfolio/3dwork.jpeg', '/assets/portfolio/ogc.jpeg',
];

const bottomImages = [
  '/assets/portfolio/ogc.png', '/assets/portfolio/poster.jpeg', '/assets/portfolio/puc.png', '/assets/portfolio/graphs.png',
];

const GalleryScroller = () => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const navigate = useNavigate();

  return (
    <div className="gallery-wrapper">
      <ProcessHeading
        backgroundText="SHOWCASE"
        foregroundText="CREATIVE HIGHLIGHTS"
        foregroundTextColor='white'
        backgroundTextFill='#7349ac'
        description='Discover a selection of our standout projects, showcasing creativity and impactful results. See how we turn ideas into reality.'
      />
      <div
        className={`image-row-wrapper top ${hoveredRow === 'top' ? 'paused' : ''}`}
        onMouseLeave={() => setHoveredRow(null)}
      >
        <div className="image-row">
          {[...topImages, ...topImages].map((src, idx) => (
            <div
              key={`top-${idx}`}
              className="image-container"
              onMouseEnter={() => setHoveredRow('top')}
            >
              <img src={src} alt={`top-${idx}`} />
              {hoveredRow === 'top' && (
                <button className="view-more-btn" onClick={() => navigate('/portfolio')}>
                  View More
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`image-row-wrapper bottom ${hoveredRow === 'bottom' ? 'paused' : ''}`}
        onMouseLeave={() => setHoveredRow(null)}
      >
        <div className="image-row reverse">
          {[...bottomImages, ...bottomImages].map((src, idx) => (
            <div
              key={`bottom-${idx}`}
              className="image-container"
              onMouseEnter={() => setHoveredRow('bottom')}
            >
              <img src={src} alt={`bottom-${idx}`} />
              {hoveredRow === 'bottom' && (
                <button className="view-more-btn" onClick={() => navigate('/portfolio')}>
                  View More
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryScroller;
