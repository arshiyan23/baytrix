import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProcessHeading from "./ProcessHeading";
import "../styles/vertical-showcase-slider.css";
import NumStats from "./NumStats";

const statsData = [
  { id: "impressionsCounter", icon: "/assets/impressions-ico.webp", value: "0",  targetValue: "120K+", label: "Total Impressions" },
  { id: "engagementCounter",  icon: "/assets/engagements-ico.webp", value: "0%", targetValue: "11.2%", label: "Avg. Engagement Rate" },
  { id: "reachCounter",       icon: "/assets/reach-ico.webp",    value: "0",  targetValue: "30K+",  label: "Accounts Reached" }
];

const VerticalShowcaseSlider = ({
  headingBackgroundText = "BACKGROUND TXT",
  headingForegroundText = "FOREGROUND TXT",
  slideShowData = []
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setCurrentIndex(i => (i + 1) % slideShowData.length);
    }, 4000);
    return () => clearInterval(iv);
  }, [slideShowData.length]);

  const handleNext = () =>
    setCurrentIndex(i => (i + 1) % slideShowData.length);
  const handlePrev = () =>
    setCurrentIndex(i => (i - 1 + slideShowData.length) % slideShowData.length);

  const currentSlide = slideShowData[currentIndex];
  const nextSlide    = slideShowData[(currentIndex + 1) % slideShowData.length];

  return (
    <section className="white-bg-wrapper">
      <ProcessHeading
        backgroundText={headingBackgroundText}
        foregroundText={headingForegroundText}
        description="Explore our curated social media content created for diverse brands, driving engagement and brand growth."
      />

      <div className="engagement-showcase-section">
        <div className="engagement-showcase-wrapper">

          {/* LEFT stays the same */}
          <motion.div
            className="engagement-left"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="floating-phone-wrapper">
              <div className="fixed-image-container">
                <img src={nextSlide.image} alt="preload" style={{ display: "none" }} />
                <AnimatePresence mode="sync" initial={false}>
                  <motion.img
                    key={currentIndex}
                    src={currentSlide.image}
                    alt="Showcase"
                    className="engagement-image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: now using mode="wait" for sequential fade */}
          <motion.div
            className="engagement-right"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="engagement-text-wrapper">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentIndex}
                  className="engagement-text-slide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={currentSlide.icon}
                    alt={`${currentSlide.title} icon`}
                    className="company-logo-bg"
                  />

                  <div className="engagement-slider-row">
                    <button className="engagement-arrow" onClick={handlePrev}>
                      &lt;
                    </button>

                    <div className="engagement-text">
                      <h2>{currentSlide.title}</h2>
                      <p>{currentSlide.description}</p>
                    </div>

                    <button className="engagement-arrow" onClick={handleNext}>
                      &gt;
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>

      <NumStats statsData={statsData} />
    </section>
  );
};

export default VerticalShowcaseSlider;
