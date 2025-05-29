import { useEffect, useState } from "react";
import "../styles/schedule-call.css";

function ScheduleCall({ onClose }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleShowCalendly = () => {
    setShowCalendly(true);
  };

  return (
    <div
      className={`schedule-overlay ${fadeOut ? "fade-out-overlay" : "fade-in-overlay"}`}
      onClick={handleClose}
    >
      <div
        className={`schedule-modal ${fadeOut ? "fade-out-modal" : "fade-in-modal"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={handleClose}>×</button>
        <div className="modal-body">
          {/* Only hide image when Calendly is shown */}
          {!showCalendly && (
            <div className="illustration-wrapper">
              <img
                src="/assets/booking.png"
                alt="Consultation Illustration"
                className="illustration"
              />
            </div>
          )}
          
          <h2>Schedule A Free Consultation</h2>
          <p>
            Looking to level up your strategy? <br />
            Get in touch for a free consultation—together, we'll craft a game plan that delivers real results!
          </p>

          {!showCalendly && (
            <div
              className="calendar-placeholder"
              onClick={handleShowCalendly}
            >
              📅 CLICK TO BOOK A TIME SLOT
            </div>
          )}

          {showCalendly && (
            <div className="calendar-embed-container">
              <iframe
                src="https://calendly.com/baytix-net/30min?back=1&month=2025-05"
                width="100%"
                height="400"
                frameBorder="0"
                title="Calendly Scheduler"
                style={{ border: "none", minWidth: "320px" }}
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScheduleCall;
