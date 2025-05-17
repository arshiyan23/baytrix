import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProcessHeading from "./ProcessHeading";
import '../styles/vertical-showcase-slider.css'

const VerticalShowcaseSlider = ({ 
  companies, 
  headingBackgroundText = "BACKGROUND TXT", 
  headingForegroundText = "FOREGROUND TXT" 
}) => {
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = companies[currentCompanyIndex].images[currentImageIndex];
  }, [companies, currentCompanyIndex, currentImageIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev =>
        (prev + 1) % companies[currentCompanyIndex].images.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [companies, currentCompanyIndex]);

  const handleNextCompany = () => {
    setCurrentCompanyIndex(prev => (prev + 1) % companies.length);
    setCurrentImageIndex(0);
  };

  const handlePrevCompany = () => {
    setCurrentCompanyIndex(prev =>
      (prev - 1 + companies.length) % companies.length
    );
    setCurrentImageIndex(0);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll(".fade-in-right");
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const currentCompany = companies[currentCompanyIndex];

  return (
    <section className="engagement-showcase-section">
      <ProcessHeading
        backgroundText={headingBackgroundText}
        foregroundText={headingForegroundText}
        description="Explore our curated social media content created for diverse brands, driving engagement and brand growth."
      />
      <div className="engagement-space"></div>
      <div className="engagement-showcase-wrapper">
        <div className="engagement-left">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentCompanyIndex + "-" + currentImageIndex}
              src={currentCompany.images[currentImageIndex]}
              alt="Social Media Post"
              className="engagement-image"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
        </div>

        <div className="engagement-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCompanyIndex}
              className="engagement-text-wrapper"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={currentCompany.logo}
                alt={`${currentCompany.name} logo`}
                className="company-logo-bg"
              />

              <div className="engagement-slider-row">
                <button className="engagement-arrow" onClick={handlePrevCompany}>
                  &lt;
                </button>

                <div className="engagement-text">
                  <h2>{currentCompany.name}</h2>
                  <p>{currentCompany.description}</p>
                </div>

                <button className="engagement-arrow" onClick={handleNextCompany}>
                  &gt;
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default VerticalShowcaseSlider;
