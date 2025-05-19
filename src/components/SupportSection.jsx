import React from "react";
import "../styles/support-section.css";
import ProcessHeading from './ProcessHeading';

const SupportSection = () => {

    const handleSupport = () => {
        if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
            window.Tawk_API.maximize();
        }
    };

    return (
        <>
            <div className="support-wrapper" id="support">
                <ProcessHeading
                    foregroundText="LIVE SUPPORT"
                    backgroundText="24/7 HELP"
                    description="We're here around the clock to answer your questions and solve issues fast — no waiting, no worries."
                />
                <div className="support-text">
                    <h2>We're Always Here for You</h2>
                    <ul>
                        <li>✔️ 24/7 customer assistance via chat and email</li>
                        <li>✔️ Multilingual support covering 15+ languages</li>
                        <li>✔️ Average response time under 90 seconds</li>
                    </ul>
                    <button className="support-button" onClick={handleSupport}>Get Support</button>
                </div>
                <div className="support-illustration">
                    <div className="chat-window">
                        <div className="chat-header">
                            <span className="status-dot"></span> Support Advisor
                        </div>

                        <div className="chat-message user">
                            <div className="message">
                                <strong>Numrain (Customer):</strong> Hi, I need help setting up my first website.
                            </div>
                            <img src="/assets/female_avatar.png" alt="User" className="avatar" />
                        </div>
                        <div className="chat-message agent">
                            <img src="/assets/male_avatar.png" alt="Agent" className="avatar" />
                            <div className="message">
                                <strong>Izhaan (Support):</strong> Absolutely! I’ll guide you step-by-step. Let’s get started together.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SupportSection;
