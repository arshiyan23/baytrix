// File: components/PromoPanel.jsx
import "../styles/promo-panel.css";
import GlobalTimer from "./GlobalTimer";

const PromoPanel = ({ onClaim }) => {
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
  <picture>
    <source media="(max-width: 767px)" srcSet="/assets/website-promo2.png" />
    <img
      src="/assets/website-promo.png"
      alt="Get Started Illustration"
      loading="lazy"
    />
  </picture>
</div>
    </div>
  )
}

export default PromoPanel;
