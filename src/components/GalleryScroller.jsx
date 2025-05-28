import React, { useState, useRef } from 'react';
import '../styles/gallery-scroller.css';
import ProcessHeading from './ProcessHeading';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

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

export default function GalleryScroller() {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const isInView = useInView(wrapperRef, { once: true, amount: 0.3 });
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div className="gallery-wrapper" ref={wrapperRef}>
      <ProcessHeading
        backgroundText="SHOWCASE"
        foregroundText="CREATIVE HIGHLIGHTS"
        description="Discover a selection of our standout projects, showcasing creativity and impactful results. See how we turn ideas into reality."
      />

      {/* Top Row: reveal then continuous scroll via Framer Motion */}
      <motion.div
        className="image-row-wrapper top"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8, rootMargin: '-100px 0px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        onMouseEnter={() => setHoveredRow('top')}
        onMouseLeave={() => setHoveredRow(null)}
      >
        <motion.div
          className="image-row"
          initial={{ x: '0%' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
        >
          {[...topImages, ...topImages].map((src, idx) => {
            const trueIdx = idx % topImages.length;
            return (
              <div
                key={`top-${trueIdx}-${idx}`}
                className="image-container"
                onClick={() => navigate('/portfolio')}
                onMouseEnter={() => setHoveredRow('top')}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <img src={src} alt={`top-${trueIdx}`} />
                {hoveredRow === 'top' && (
                  <button className="view-more-btn">View More</button>
                )}
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Bottom Row: reveal then continuous reverse scroll */}
      <motion.div
        className="image-row-wrapper bottom"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6, rootMargin: '-100px 0px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        onMouseEnter={() => setHoveredRow('bottom')}
        onMouseLeave={() => setHoveredRow(null)}
      >
        <motion.div
          className="image-row reverse"
          initial={{ x: '-50%' }}
          animate={{ x: ['-50%', '0%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
        >
          {[...bottomImages, ...bottomImages].map((src, idx) => {
            const trueIdx = idx % bottomImages.length;
            return (
              <div
                key={`bottom-${trueIdx}-${idx}`}
                className="image-container"
                onClick={() => navigate('/portfolio')}
                onMouseEnter={() => setHoveredRow('bottom')}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <img src={src} alt={`bottom-${trueIdx}`} />
                {hoveredRow === 'bottom' && (
                  <button className="view-more-btn">View More</button>
                )}
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}