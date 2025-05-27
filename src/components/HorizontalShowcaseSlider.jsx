// HorizontalShowcaseSlider.jsx
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % companies[0].images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [companies]);

  const currentImages = companies[0].images;

  return (
    <section className="horizontal-showcase-container">
      <ProcessHeading
        backgroundText={headingBackgroundText}
        foregroundText={headingForegroundText}
        foregroundTextColor={foregroundTextColor}
        backgroundTextFill={foregroundTextColor}
        description="Explore the powerful apps we’ve engineered for various brands, designed to enhance user experience, streamline processes, and drive business growth."
      />

      <div className="horizontal-showcase-section single">
        <div className="image-wrapper full-width">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={currentImages[currentImageIndex]}
              alt={`Showcase ${currentImageIndex + 1}`}
              className="horizontal-image"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>

          <div className="image-indicators">
            {currentImages.map((_, index) => (
              <button
                key={index}
                className={`indicator-dot ${index === currentImageIndex ? "active" : ""}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalShowcaseSlider;