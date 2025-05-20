import React, { useState } from 'react';
import '../styles/gallery-scroller.css';
import ProcessHeading from './ProcessHeading';

const topImages = [
  '/assets/port9.png', '/assets/port10.png', '/assets/port11.png', '/assets/port12.png',
];

const bottomImages = [
  '/assets/port13.png', '/assets/port14.png', '/assets/port1.png', '/assets/port4.png',
];

const GalleryScroller = () => {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div className="gallery-wrapper" id="portfolio">
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
                <button className="view-more-btn">View More</button>
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
                <button className="view-more-btn">View More</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryScroller;
