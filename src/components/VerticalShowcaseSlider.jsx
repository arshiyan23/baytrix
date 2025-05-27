import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProcessHeading from "./ProcessHeading";
import "../styles/vertical-showcase-slider.css";
import NumStats from "./NumStats";

const statsData = [
  {
    id: "impressionsCounter",
    icon: "/assets/impressions-ico.png",
    value: "0",
    targetValue: "120K+",
    label: "Total Impressions"
  },
  {
    id: "engagementCounter",
    icon: "/assets/engagements-ico.png",
    value: "0%",
    targetValue: "11.2%",
    label: "Avg. Engagement Rate"
  },
  {
    id: "reachCounter",
    icon: "/assets/reach-ico.png",
    value: "0",
    targetValue: "30K+",
    label: "Accounts Reached"
  }
];


const VerticalShowcaseSlider = ({
  headingBackgroundText = "BACKGROUND TXT",
  headingForegroundText = "FOREGROUND TXT",
  slideShowData = []
}) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slideShowData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % slideShowData.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + slideShowData.length) % slideShowData.length);
  };

  const currentSlide = slideShowData[currentIndex];

  return (
    <section className="white-bg-wrapper">
      <ProcessHeading
          backgroundText={headingBackgroundText}
          foregroundText={headingForegroundText}
          // backgroundTextFill="#f5f0ff"
          description="Explore our curated social media content created for diverse brands, driving engagement and brand growth."
        />
      <div className="engagement-showcase-section">
        
        <div className="engagement-showcase-wrapper">
          <div className="engagement-left">
            <div className="floating-phone-wrapper">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={currentSlide.image}
                  alt="Social Media Post"
                  className="engagement-image"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
            </div>
          </div>

          <div className="engagement-right">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="engagement-text-wrapper"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2 }}
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
        </div>
      </div>
      <NumStats 
        statsData={statsData}
        />
    </section>
  );
};

export default VerticalShowcaseSlider;
