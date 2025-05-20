// File: components/PromoPanel.jsx
import React, { useState, useEffect } from 'react';
import "../styles/promo-panel.css";
import GlobalTimer from "./GlobalTimer";

const PromoPanel = ({ onClaim }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Initial check
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    // Update on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="popup-panel">
      <div className="popup-text">
        <h2>Get Your FREE Custom Website</h2>
        <p>
          <strong>Ready to launch your online presence?</strong><br />
          For a limited time, claim your personalized website – absolutely <strong>FREE</strong>! Let our
          digital experts build it for you.
        </p>
        <div className="popup-cta">
          <button className="popup-button" onClick={onClaim}>
            CLAIM OFFER
          </button>
          <GlobalTimer />
        </div>
      </div>
      <div className="popup-image">
        <img
          src={isMobile ? "/assets/website-promo2.png" : "/assets/website-promo.png"}
          alt="Get Started Illustration"
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default PromoPanel;
