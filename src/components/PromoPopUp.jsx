import { useEffect, useRef, useState } from "react";
import "../styles/promo-popup.css";
import emailjs from '@emailjs/browser';
import GlobalTimer from "./GlobalTimer";

function PromoPopUp() {
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
    }, 400);
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      'service_egzkqwo',
      'template_613td3e',
      {
        from_name: name,
        from_email: email,
        from_phone: phone,
        message: message,
      },
      'tVL2DMM9tw247TscT'
    )
      .then(() => {
        setLoading(false);
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
        setPhone('');
        setTimeout(() => handleClose(), 2000);
      })
      .catch((err) => {
        setLoading(false);
        console.error('Failed to send email:', err);
        alert('There was a problem sending your message. Please try again.');
      });
  };

  return (
    <div
      ref={overlayRef}
      className={`popup-overlay ${showPopup ? "show" : ""}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`popup-container ${submitted ? "compact-mode" : ""} ${!showForm ? "first-panel-mode" : ""}`}
      >
        <button className="popup-close" onClick={handleClose}>
          &times;
        </button>
        <div className="popup-content-wrapper">
          <div className={`popup-slider ${showForm ? "slide-left" : ""}`}></div>
          <div className={`popup-slider ${showForm ? "slide-left" : ""}`}>
            {/* Slide 1: Promo Panel */}
            <div className="popup-panel">
              <div className="popup-text">
                <h2>
                  Get Your FREE Custom Website
                </h2>
                <p>
                  <strong>Ready to launch your online presence?</strong><br />
                  For a limited time, claim your
                  personalized website – absolutely <strong>FREE</strong>!
                  Let our digital experts build it for you.
                </p>
                <div className="popup-cta">
                  <button
                    className="popup-button"
                    onClick={() => setShowForm(true)}
                  >
                    CLAIM OFFER
                  </button>
                  <GlobalTimer />
                </div>

              </div>
              <div className="popup-image">
                <img
                  src="/assets/website-promo.png"
                  alt="Get Started Illustration"
                />
              </div>
            </div>

            {/* Slide 2: Lead Capture Panel */}
            <div className={`popup-panel ${submitted ? "thank-you-mode" : ""}`}>
              <div className="popup-text">
                {submitted ? (
                  <div className="thank-you-wrapper">
                    <img
                      src="/assets/thanks.png"
                      alt="Thank You"
                      className="thank-you-image"
                    />
                    <div className="thank-you-message">
                      Thank you!<br />We'll be in touch very soon.
                    </div>
                  </div>
                ) : (
                  <>
                    <h2>Let's Get Started!</h2>
                    <p>Tell us a little about you and we'll build your dream site for FREE.</p>
                    <form className="lead-form" onSubmit={handleSubmit}>
                      <input
                        type="text"
                        placeholder="*Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <input
                        type="email"
                        placeholder="*Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <input
                        type="tel"
                        placeholder="*Your Phone Number (e.g. +1234567890)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        pattern="^\+\d{10,15}$"
                        title="Please enter a valid phone number with country code (e.g. +1234567890)"
                      />

                      <textarea
                        placeholder="Your Message (optional)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                      />
                      {loading ? (
                        <div className="spinner"></div>
                      ) : (
                        <button type="submit">SUBMIT</button>
                      )}
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromoPopUp;
