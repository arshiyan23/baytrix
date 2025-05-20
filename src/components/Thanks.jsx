// File: components/Thanks.jsx
import React from "react";
import "../styles/thanks.css";

const Thanks = () => (
  <div className="popup-panel thank-you-mode">
    <div className="thank-you-wrapper">
      <img
        src="/assets/thanks.png"
        alt="Thank You"
        className="thank-you-image"
        loading="lazy"
      />
      <div className="thank-you-message">
        Thank you!<br />
        We'll be in touch very soon.
      </div>
    </div>
  </div>
);

export default Thanks;
