import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/horizontal-showcase-slider.css";
import ProcessHeading from "./ProcessHeading";

const HorizontalShowcaseSlider = ({
    companies,
    headingBackgroundText = "BACKGROUND TXT",
    headingForegroundText = "FOREGROUND TXT",
    foregroundTextColor = "#7349ac"
}) => {
    const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prev =>
                (prev + 1) % companies[currentCompanyIndex].images.length
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [companies, currentCompanyIndex]);

    const handleNext = () => {
        setCurrentCompanyIndex(prev => (prev + 1) % companies.length);
        setCurrentImageIndex(0);
    };

    const handlePrev = () => {
        setCurrentCompanyIndex(prev =>
            (prev - 1 + companies.length) % companies.length
        );
        setCurrentImageIndex(0);
    };

    const current = companies[currentCompanyIndex];

    return (
        <section className="horizontal-showcase-container">
            <ProcessHeading
                backgroundText={headingBackgroundText}
                foregroundText={headingForegroundText}
                foregroundTextColor={foregroundTextColor}
            />
            {/* <p>
            We build reliable, scalable digital solutions that help your
            business move faster, reach further, and grow stronger.
          </p> */}

            <div className="horizontal-showcase-section">
                <div className="horizontal-left">
                    <div className="image-wrapper">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentCompanyIndex + "-" + currentImageIndex}
                                src={current.images[currentImageIndex]}
                                alt={current.name}
                                className="horizontal-image"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.2 }}
                            />
                        </AnimatePresence>

                        <div className="image-indicators">
                            {current.images.map((_, index) => (
                                <button
                                    key={index}
                                    className={`indicator-dot ${index === currentImageIndex ? "active" : ""
                                        }`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="horizontal-right">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentCompanyIndex}
                            className="horizontal-content"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img
                                src={current.logo}
                                alt={`${current.name} logo`}
                                className="horizontal-logo"
                            />
                            <h2>{current.name}</h2>
                            <p>{current.description}</p>

                            <div className="horizontal-nav">
                                <button onClick={handlePrev}>&lt;</button>
                                <button onClick={handleNext}>&gt;</button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default HorizontalShowcaseSlider;
