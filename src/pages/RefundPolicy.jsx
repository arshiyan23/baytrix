import React from 'react';
import '../styles/refund-policy.css';

const RefundPolicy = () => {

    const handleSupport = () => {
        if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
            window.Tawk_API.maximize();
        }
    };
    return (
        <div className="refund-container">
            <h1 className="refund-title">Refund Policy</h1>
            <p className="refund-updated">Last updated: May 19, 2025</p>

            <img
                src="/assets/refund-illustration2.png"
                className="refund-image"
            />

            <section className="refund-section">
                <p>
                    At Baytix, we are committed to providing high-quality services in Branding, Application Design,
                    Social Media Management, Marketing Ads, and AI Integration.
                </p>
                <p>
                    Due to the customized and digital nature of our services, we do not offer refunds once a project has commenced,
                    assets have been delivered, or work has been approved by the client.
                </p>
                <br/>
                <p>
                    However, we understand that every situation is unique. If you believe there is a valid reason for a refund
                    request, we encourage you to contact us directly at{" "}
                    <a href="mailto:info@baytix.net" target="_blank" rel="noopener noreferrer">
                        info@baytix.net
                    </a>
                    , or{" "}
                    <button className="refund-underline-button" onClick={handleSupport}>
                        Click Here
                    </button>{" "}
                    to open a live chat. We will carefully review the situation and, if appropriate, offer a partial refund or
                    credit depending on the circumstances.
                </p>

                <p>
                    Please note that refund eligibility is determined on a case-by-case basis and is not guaranteed.
                </p>
            </section>

            <section className="refund-section">
                <h2>Contact</h2>
                <p>
                    For any questions regarding this refund policy, please contact us at <span style={{color:"#7349ac", fontWeight:"600"}}>info@baytix.com</span>.
                </p>
            </section>
        </div>
    );
};

export default RefundPolicy;
