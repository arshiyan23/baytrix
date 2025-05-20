// File: components/PromoPopUp.jsx
import { useEffect, useRef, useState } from "react";
import "../styles/promo-popup.css";
import PromoPanel from "./PromoPanel";
import LeadForm from "./LeadForm";
import Thanks from "./Thanks";
import emailjs from "@emailjs/browser";

function PromoPopUp({ visible: controlledVisible, autoShow = false, onClose, forceShow = false }) {
  const [internalVisible, setInternalVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef(null);
  const [hasMounted, setHasMounted] = useState(false);

  const visible = controlledVisible !== undefined ? controlledVisible : internalVisible;

  useEffect(() => {
    // Always allow popup to show again on reload
    localStorage.removeItem("promoPopupShown");

    if (forceShow) {
      setInternalVisible(true);
      setHasMounted(true);
      return;
    }

    if (autoShow) {
      const timer = setTimeout(() => {
        setInternalVisible(true);
        localStorage.setItem("promoPopupShown", "true");
      }, 2500);

      setHasMounted(true); // Important to set this here

      return () => clearTimeout(timer);
    }

    setHasMounted(true); // fallback just in case
  }, [autoShow, forceShow]);


  if (!hasMounted || (!visible && !isClosing)) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      if (controlledVisible !== undefined) {
        onClose?.();
      } else {
        setInternalVisible(false);
      }
      // Reset form and step
      setStep(0);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setLoading(false);
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

    emailjs
      .send(
        "service_egzkqwo",
        "template_613td3e",
        { from_name: name, from_email: email, from_phone: phone, message },
        "tVL2DMM9tw247TscT"
      )
      .then(() => {
        setLoading(false);
        setStep(2);
        setTimeout(handleClose, 2000);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Failed to send email:", err);
        alert("There was a problem sending your message. Please try again.");
      });
  };

  const overlayClasses = [
    "popup-overlay",
    "show",
    isClosing ? "fade-out" : "fade-in",
  ].join(" ");

  const containerClasses = [
    "popup-container",
    isClosing ? "fade-out" : "fade-in",
    step === 0 ? "first-panel-mode" : "",
    step === 1 ? "form-mode" : "",
    step === 2 ? "compact-mode" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={overlayRef} className={overlayClasses} onClick={handleOverlayClick}>
      <div className={containerClasses}>
        <button className="popup-close" onClick={handleClose} aria-label="Close Popup">
          &times;
        </button>

        {step === 0 && <PromoPanel onClaim={() => setStep(1)} />}

        {step === 1 && (
          <LeadForm
            name={name}
            email={email}
            phone={phone}
            message={message}
            loading={loading}
            onChangeName={setName}
            onChangeEmail={setEmail}
            onChangePhone={setPhone}
            onChangeMessage={setMessage}
            onSubmit={handleSubmit}
          />
        )}

        {step === 2 && <Thanks />}
      </div>
    </div>
  );
}

export default PromoPopUp;
