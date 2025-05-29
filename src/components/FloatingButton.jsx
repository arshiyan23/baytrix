import React, { useState, useEffect } from "react";
import PromoPopUp from "./PromoPopUp";
import "../styles/floating-button.css";

const FloatingButton = () => {
  const [open, setOpen] = useState(true);
  const [showPromo, setShowPromo] = useState(false);
  const [showFreeWebsiteBtn, setShowFreeWebsiteBtn] = useState(false); // New state

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFreeWebsiteBtn(true);
    }, 2500); // 2.5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsApp = () => {
    const phoneNumber = "919999999999";
    const message = "Hi! I’d like to get floating.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleSupport = () => {
    if (window.Tawk_API && typeof window.Tawk_API.maximize === "function") {
      window.Tawk_API.maximize();
    }
  };

  return (
    <>
      <div className="floating-btn-wrapper">
        <div className={`floating-options ${open ? "show-options" : ""}`}>
          {showFreeWebsiteBtn && (
            <button className="floating-offer-btn" onClick={() => setShowPromo(true)}>
              <span className="floating-offer-badge">+1</span>
              <img src="/assets/offer-ico.webp" alt="Offer" width={20} height={20} />
              Free Website
            </button>
          )}
          <button onClick={handleSupport}>
            <img src="/assets/support-ico.webp" alt="Help" width={20} height={20} />
            Support
          </button>
          <button onClick={handleWhatsApp}>
            <img src="/assets/whatsapp-ico.webp" alt="WhatsApp" width={20} height={20} />
            WhatsApp
          </button>
          <button onClick={() => window.open("https://linktr.ee/Baytix", "_blank")}>
            <img src="/assets/linktree-ico.webp" alt="Socials" width={20} height={20} />
            Socials
          </button>
        </div>
        <button
          className={`main-floating-btn pulse ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle Floating Button"
        >
          {!open && <span className="floating-offer-badge main-badge">+1</span>}
          {open ? "×" : <img src="/assets/hamburger-ico.webp" alt="Open Help" width={22} height={22} />}
        </button>

      </div>
      {showPromo && (
        <PromoPopUp
          forceShow={true}
          visible={showPromo}
          onClose={() => setShowPromo(false)}
        />
      )}
    </>
  );
};

export default FloatingButton;
