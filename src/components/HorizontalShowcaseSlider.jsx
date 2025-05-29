import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProcessHeading from "./ProcessHeading";
import "../styles/horizontal-showcase-slider.css";
import NumStats from "./NumStats";

const statsData = [
  { id: "appsCounter",    icon: "/assets/icon-apps.webp",    value: "0", targetValue: "52+",  label: "Apps Running" },
  { id: "usersCounter",   icon: "/assets/icon-users.webp",   value: "0", targetValue: "75K+", label: "Users Served" },
  { id: "uptimeCounter",  icon: "/assets/icon-uptime.webp",  value: "0%", targetValue: "99.9%", label: "Uptime Guarantee" },
  { id: "reviewsCounter", icon: "/assets/icon-reviews.webp", value: "0%", targetValue: "100%",  label: "Reviews Received" }
];

const HorizontalShowcaseSlider = ({
  headingBackgroundText = "BACKGROUND TXT",
  headingForegroundText = "FOREGROUND TXT",
  description = "",
  slideShowData = []
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slideShowData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideShowData.length]);

  const handleNext = () => setCurrentIndex(i => (i + 1) % slideShowData.length);
  const handlePrev = () => setCurrentIndex(i => (i - 1 + slideShowData.length) % slideShowData.length);

  const currentSlide = slideShowData[currentIndex];

  return (
    <section className="hrzn-white-bg-wrapper">
      <ProcessHeading
        backgroundText={headingBackgroundText}
        foregroundText={headingForegroundText}
        description={description}
      />

      <div className="hrzn-engagement-showcase-section">
        <div className="hrzn-engagement-showcase-wrapper">
          
          {/* LEFT: scroll-triggered slide-in */}
          <motion.div
            className="hrzn-engagement-left"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="hrzn-floating-phone-wrapper">
              <div className="hrzn-fixed-image-container">
                {/* CROSS-FADE TRANSITION */}
                <AnimatePresence mode="sync" initial={false}>
                  <motion.img
                    key={currentIndex}
                    src={currentSlide.image}
                    alt="App Preview"
                    className="hrzn-engagement-image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: scroll-triggered slide-in */}
          <motion.div
            className="hrzn-engagement-right"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="hrzn-engagement-text-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={currentSlide.icon}
                  alt={`${currentSlide.title} icon`}
                  className="hrzn-company-logo-bg"
                />

                <div className="hrzn-engagement-slider-row">
                  <button className="hrzn-engagement-arrow" onClick={handlePrev}>
                    &lt;
                  </button>

                  <div className="hrzn-engagement-text">
                    <h2>{currentSlide.title}</h2>
                    <p>{currentSlide.description}</p>
                  </div>

                  <button className="hrzn-engagement-arrow" onClick={handleNext}>
                    &gt;
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>

      <NumStats statsData={statsData} />
    </section>
  );
};

export default HorizontalShowcaseSlider;
