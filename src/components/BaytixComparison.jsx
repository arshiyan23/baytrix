import React, { useState } from 'react';
import '../styles/baytix-comparison.css';
import { motion } from 'framer-motion';
import ProcessHeading from './ProcessHeading';

const metrics = [
    { name: 'Affordable Packages', desc: 'Value-driven pricing for startups.' },
    { name: 'Custom Strategies', desc: 'Tailored growth solutions for every brand.' },
    { name: 'Branding Expertise', desc: "Crafting unique brand identities that's a 100% organic." },
    { name: 'Well Engineered Applications', desc: 'User-first, responsive, intuitive designs.' },
    { name: 'Social Media Management', desc: 'Consistent content and engagement.' },
    { name: 'Performance Marketing Ads', desc: 'Conversion-optimized ad strategies.' },
];

export default function BaytixComparison() {
    const [showCalendly, setShowCalendly] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const handleClick = () => {
        setShowCalendly(true);
        setIsLoading(true);
    };

    return (
        <div className="cmpr-wrapper">
            <ProcessHeading
                foregroundText="WHY CHOOSE US?"
                backgroundText="COMPARISON"
                description="Discover how Baytix outperforms traditional agencies in everything — all 
                tailored to help startups and businesses grow faster, smarter, and stronger."
            />
            <div className="cmpr-container">
                {/* LEFT: Comparison Table */}
                <motion.div
                    className="cmpr-left-panel"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="cmpr-title">WE ARE THE BEST BECAUSE</h2>
                    <p className="cmpr-subtitle">
                        We Deliver More Than Just Services—We Build Growth Engines.
                    </p>

                    <table className="cmpr-table">
                        <colgroup>
                            <col style={{ width: '50%' }} />
                            <col style={{ width: '25%' }} />
                            <col style={{ width: '25%' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Metric</th>
                                <th>
                                    <img
                                        src="/assets/baytixlogo-nobg-purple.png"
                                        alt="Baytix Logo"
                                        className="cmpr-logo"
                                    />
                                </th>
                                <th>Other Competitors</th>
                            </tr>
                        </thead>
                        <tbody>
                            {metrics.map((m, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <div className="cmpr-metric-name">{m.name}</div>
                                        <div className="cmpr-metric-desc">{m.desc}</div>
                                    </td>
                                    <td className="cmpr-baytix-cell">
                                        <img
                                            src="/assets/rounded-tick.png"
                                            alt="✔"
                                            className="cmpr-icon"
                                        />
                                    </td>
                                    <td>
                                        <img
                                            src="/assets/rounded-cross.png"
                                            alt="✖"
                                            className="cmpr-icon"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                {/* RIGHT: Calendly Embed + Illustration */}
                <motion.div
                    className={`cmpr-right-panel${loaded ? ' loaded' : ''}`}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    layout
                >
                    <motion.img
                        src="/assets/booking.png"
                        alt="Schedule Illustration"
                        className="cmpr-calendar-img"
                        initial={{ opacity: 1, y: 0 }}
                        animate={showCalendly ? { opacity: 0, y: -80 } : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    />

                    <motion.h2 className="cmpr-title" layout transition={{ duration: 0.5 }}>
                        Ready to Grow? Let’s Talk!
                    </motion.h2>
                    <motion.p className="cmpr-subtitle" layout transition={{ duration: 0.5 }}>
                        Book a free 30-mins strategy call today—choose a slot below.
                    </motion.p>

                    <div className="cmpr-calendar-section">
                        {!showCalendly && (
                            <motion.div
                                className="cmpr-calendar-placeholder"
                                onClick={handleClick}
                                initial={{ opacity: 1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                📅 CLICK TO BOOK A TIME SLOT
                            </motion.div>
                        )}

                        {showCalendly && isLoading && (
                            <motion.div
                                className="cmpr-spinner"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        )}

                        {showCalendly && (
                            <motion.div
                                className="cmpr-calendar-embed-container"
                                initial={{ opacity: 0 }}
                                animate={loaded ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <iframe
                                    src="https://calendly.com/baytix-net/30min"
                                    width="100%"
                                    height="400"
                                    frameBorder="0"
                                    title="Calendly Scheduler"
                                    style={{ border: 'none', minWidth: '320px' }}
                                    onLoad={() => {
                                        setLoaded(true);
                                        setIsLoading(false);
                                    }}
                                />
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
