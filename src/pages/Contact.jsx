import { useState, useEffect } from 'react';
import '../styles/contact.css';

const InfoPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [justCopied, setJustCopied] = useState(null);

    useEffect(() => {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        const openDays = day >= 1 && day <= 6;
        const openHours = hour >= 9 && hour < 18;
        setIsOpen(openDays && openHours);
    }, []);

    const handleSupport = () => {
        if (window.Tawk_API?.maximize) {
            window.Tawk_API.maximize();
        }
    };

    const copyToClipboard = (value, key) => {
        navigator.clipboard.writeText(value).then(() => setJustCopied(key));
    };

    return (
        <div className="info-container">
            <h2>Our Contact Information</h2>

            {/* QR Code */}
            <div className="qr-code">
                <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://tawk.to/chat/6829cbbea2024f190943c900/1irhk7odd"
                    alt="Scan to chat"
                />
                <p>Scan</p>
                or{" "}
                <button className="chatnow-button" onClick={handleSupport}>
                    Click Here
                </button>{" "}
                to open a live chat.
            </div>

            {/* Contact Cards */}
            <div className="contact-cards">
                <div className="card phone-card" onClick={() => copyToClipboard('+919326191141', 'phone')}>
                    <i className="fas fa-phone card-icon" />
                    <span>+91 932 619 1141</span>
                    <button className="copy-btn" aria-label="Copy phone number">
                        {justCopied === 'phone' ? (
                            <i className="fas fa-check" style={{ color: '#28a745', animation: 'fadeCheck 1.5s forwards' }} />
                        ) : (
                            <i className="fas fa-copy" />
                        )}
                    </button>
                </div>

                <div className="card email-card" onClick={() => copyToClipboard('info@baytix.net', 'email')}>
                    <i className="fas fa-envelope card-icon" />
                    <span>info@baytix.net</span>
                    <button className="copy-btn" aria-label="Copy email">
                        {justCopied === 'email' ? (
                            <i className="fas fa-check" style={{ color: '#28a745', animation: 'fadeCheck 1.5s forwards' }} />
                        ) : (
                            <i className="fas fa-copy" />
                        )}
                    </button>
                </div>
            </div>

            {/* Social Links */}
            <div className="social-links">
                <a href="https://www.linkedin.com/company/baytixsocial/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in" />
                </a>
                <a href="https://www.facebook.com/baytix_social" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="fab fa-facebook-f" />
                </a>
                <a href="https://www.instagram.com/baytix_social" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram" />
                </a>
                <a href="https://twitter.com/Baytix_social" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 1200 1227">
                        <path d="M682.7 556.8 1141.6 0h-104L639.8 445.4 279.3 0H0l491.4 665.8L58.4 1227h104l429.1-495.4L933 1227h279.3z" />
                    </svg>
                </a>
                <a href="https://www.youtube.com/@Baytix_Social" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <i className="fab fa-youtube" />
                </a>
            </div>

            {/* Office Hours */}
            <div className={`office-hours ${isOpen ? 'open' : 'closed'}`}>
                {isOpen ? '🟢 Open Now (Mon–Sat 9AM–6PM)' : '🔴 Sorry, We Are Closed (Mon–Sat 9AM–6PM)'}
            </div>
        </div>
    );
};

const Contact = () => (
    <div className="contact-wrapper">
        <div className="contact-grid">
            <div className="grid-image">
                <img src="/assets/contact-hero.png" alt="Contact Illustration" />
                <h1 className="contact-title">Contact Us</h1>
            </div>

            <div className="info-form-row">
                <InfoPanel />
                <div className="vertical-divider" />
                <div className="grid-panel panel-form">
                    <h2>Send us a message</h2>
                    <form className="contact-form">
                        <input type="text" placeholder="Full Name" required />
                        <input type="email" placeholder="Email Address" required />
                        <input type="text" placeholder="Subject" required />
                        <textarea placeholder="Your message..." rows="5" required />
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
);

export default Contact;
