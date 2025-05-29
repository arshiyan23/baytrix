// src/components/ScrollToTopBtn.jsx
import React, { useEffect, useState } from 'react';
import '../styles/scroll-to-top-btn.css';

const ScrollToTopBtn = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 800) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`scroll-to-top-btn ${visible ? 'show' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <img src='/assets/arrow-up.webp'></img>
    </button>
  );
};

export default ScrollToTopBtn;
