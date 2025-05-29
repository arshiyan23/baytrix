import React from 'react';
import '../styles/terms-and-conditions.css';

const TermsAndConditions = () => {

    const handleSupport = () => {
        if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
            window.Tawk_API.maximize();
        }
    }


    return (
        <div className="terms-container">
            <h1 className="terms-title">Terms and Conditions</h1>
            <p className="terms-updated">Last updated: May 19, 2025</p>

            <img
                src="/assets/terms-illustration2.webp"
                alt="Baytix Services Illustration"
                className="terms-image"
            />

            <section className="terms-section">
                <h2>1. Introduction</h2>
                <p>
                    Welcome to Baytix. These Terms and Conditions govern your use of our services. By accessing or
                    using our website and services, you agree to comply with and be bound by these terms.
                </p>
            </section>

            <section className="terms-section">
                <h2>2. Services Provided</h2>
                <p>
                    Baytix offers Branding, Application Design, Social Media Management, and Marketing Ads
                    services tailored for startups and businesses. The scope of services will be agreed upon in writing with each client.
                </p>
            </section>

            <section className="terms-section">
                <h2>3. Client Responsibilities</h2>
                <p>
                    Clients must provide accurate information, timely feedback, and any assets or data required to complete
                    the agreed-upon services. Delays caused by the client may affect delivery timelines.
                </p>
            </section>

            <section className="terms-section">
                <h2>4. Payments and Refunds</h2>
                <p>
                    Payments for services must be made as per the invoiced terms. Refunds are only applicable in cases
                    where services have not yet commenced or as outlined in a separate agreement.
                </p>
            </section>

            <section className="terms-section">
                <h2>5. Intellectual Property</h2>
                <p>
                    All assets created by Baytix, including designs, branding elements, and AI solutions, remain the property
                    of Baytix until full payment is received. Upon full payment, ownership is transferred to the client unless otherwise stated.
                </p>
            </section>

            <section className="terms-section">
                <h2>6. Termination</h2>
                <p>
                    Either party may terminate the agreement with written notice. Upon termination, all outstanding payments
                    become due immediately.
                </p>
            </section>

            <section className="terms-section">
                <h2>7. Changes to Terms</h2>
                <p>
                    We reserve the right to update these Terms and Conditions at any time. Updates will be posted on this page.
                </p>
            </section>

            <section className="terms-section">
                <h2>8. Contact Us</h2>
                <p>
                    If you have any questions about these Terms and Conditions, please contact us directly at{" "}
                    <a href="mailto:info@baytix.net" target="_blank" rel="noopener noreferrer">
                        info@baytix.net
                    </a>
                    , or{" "}
                    <button className="terms-underline-button" onClick={handleSupport}>
                        Click Here
                    </button>{" "}
                    to open a live chat.
                </p>
            </section>
        </div>
    );
};

export default TermsAndConditions;
