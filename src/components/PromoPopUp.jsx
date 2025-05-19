import { useEffect, useRef, useState } from "react";
import "../styles/promo-popup.css";

function PromoPopUp() {
  const [showPopup, setShowPopup] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  return (
    <>
      <div
        ref={overlayRef}
        className={`popup-overlay ${showPopup ? "show" : ""}`}
        onClick={handleOverlayClick}
      >
        <div className="popup-container">
          <button className="popup-close" onClick={handleClose}>
            &times;
          </button>
          <div className="popup-content">
            <div className="popup-text">
              <h2>
                Get Your FREE Custom Website!
              </h2>
              <p>
                Ready to launch your online presence? For a limited time,
                claim your professionally designed, personalized website –
                absolutely <strong>FREE</strong>! Let our digital experts
                build the perfect online home for your brand.
              </p>
              <a href="#claim" className="popup-button">
                Claim Your Free Website Now!
              </a>
            </div>
            <div className="popup-image">
              <img
                src="/assets/free-website-promo-image.png"
                alt="Free Website Offer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PromoPopUp;
