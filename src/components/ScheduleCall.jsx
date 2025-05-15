import { useEffect, useState } from "react";
import "../styles/schedule-call.css";

function ScheduleCall({ onClose }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      onClose();
    }, 600); // Match with fade-out animation duration
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Call scheduled!");
    handleClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
        <h2>Schedule A Free Consultation</h2>
        <p>Looking to level up your strategy? <br />
          Get in touch for a 
          free consultation—together, we'll craft a game plan that delivers real results!</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="datetime-local" required />
          <textarea placeholder="Tell us what you'd like to discuss" rows="4" />
          <button type="submit">Confirm Schedule</button>
        </form>
      </div>
    </div>
  );
}

export default ScheduleCall;
