import React, { useState } from "react";
import "../styles/floating-button.css";

const FloatingButton = () => {
  const [open, setOpen] = useState(true);

  const handleWhatsApp = () => {
    const phoneNumber = "919999999999";
    const message = "Hi! I’d like to get floating.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+919999999999";
  };  

  const handleSupport = () => {
    window.location.href = "tel:+919999999999";
  };

  return (
    <div className="floating-btn-wrapper">
      <div className={`floating-options ${open ? "show-options" : ""}`}>
        <button onClick={handleCall}>
          <img src="/assets/call-ico.png" alt="Call" width={20} height={20} />
          Call
        </button>
        <button onClick={handleWhatsApp}>
          <img src="/assets/whatsapp-ico.png" alt="WhatsApp" width={20} height={20} />
          WhatsApp
        </button>
        <button onClick={handleSupport}>
          <img src="/assets/support-ico.png" alt="Help" width={20} height={20} />
          Support
        </button>
      </div>

      <button
        className={`main-floating-btn pulse ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle Floating Button"
      >
        {open ? "×" : <img src="/assets/hamburger-ico.png" alt="Open Help" width={22} height={22} />}

      </button>
    </div>
  );
};

export default FloatingButton;
