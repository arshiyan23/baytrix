import React from 'react';
import '../styles/privacy-policy.css';

const PrivacyPolicy = () => {

    const handleSupport = () => {
        if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
            window.Tawk_API.maximize();
        }
    }

    return (
        <div className="privacy-container">
            <h1 className="privacy-title">Privacy Policy</h1>
            <p className="privacy-updated">Last updated: May 19, 2025</p>

            <img
                src="/assets/privacy-illustration.webp"
                alt="Privacy Illustration"
                className="privacy-image"
            />

            <section className="privacy-section">
                <p>
                    At Baytix, your privacy and data security are our top priorities. We are fully committed to protecting your
                    personal and business information with the highest standards of care. This policy outlines how we handle data
                    and our strict approach to maintaining your trust.
                </p>
            </section>

            <section className="privacy-section">
                <h2>1. Data Collection</h2>
                <p>We only collect the information that is necessary to provide our services, such as contact details, business requirements, and payment information.</p>
            </section>

            <section className="privacy-section">
                <h2>2. No Unnecessary Tracking</h2>
                <p>We do not engage in unnecessary tracking or behavior-based profiling. Any tracking tools used are solely for site functionality and security.</p>
            </section>

            <section className="privacy-section">
                <h2>3. Zero Tolerance for Data Resale</h2>
                <p>We never sell or rent your personal or business data to third parties. Your information is strictly used to serve your business needs.</p>
            </section>

            <section className="privacy-section">
                <h2>4. Secure Storage</h2>
                <p>All data is stored in encrypted databases with restricted access and is regularly audited for vulnerabilities and compliance.</p>
            </section>

            <section className="privacy-section">
                <h2>5. Access Control</h2>
                <p>Only authorized personnel with a legitimate need-to-know have access to client information.</p>
            </section>

            <section className="privacy-section">
                <h2>6. Third-Party Tools</h2>
                <p>When third-party tools or services are used (e.g., analytics or payment processors), we ensure they are GDPR- and/or CCPA-compliant.</p>
            </section>

            <section className="privacy-section">
                <h2>7. Client Consent</h2>
                <p>We seek clear, informed consent before collecting or using any personal data. You can withdraw consent at any time.</p>
            </section>

            <section className="privacy-section">
                <h2>8. Data Retention</h2>
                <p>Client data is retained only for as long as necessary to fulfill the purpose for which it was collected or as required by law.</p>
            </section>

            <section className="privacy-section">
                <h2>9. Breach Response</h2>
                <p>In the unlikely event of a data breach, we commit to notifying affected clients promptly and transparently, and to taking immediate corrective actions.</p>
            </section>

            <section className="privacy-section">
                <h2>10. Client Rights</h2>
                <p>You have the right to access, correct, delete, or export your personal data at any time. Contact us to exercise these rights.</p>
            </section>

            <section className="privacy-section">
                <h2>Contact</h2>
                <p>If you have questions about any policy or your data, contact us directly at{" "}
                    <a href="mailto:info@baytix.net" target="_blank" rel="noopener noreferrer">
                        info@baytix.net
                    </a>
                    , or{" "}
                    <button className="privacy-underline-button" onClick={handleSupport}>
                        Click Here
                    </button>{" "}
                    to open a live chat.
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
