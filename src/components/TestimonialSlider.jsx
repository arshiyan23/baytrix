import React from "react";
import { motion } from "framer-motion";
import "../styles/testimonial-slider.css";
import ProcessHeading from "./ProcessHeading";

const TestimonialSlider = ({
  testimonials,
  headingBackgroundText = "BACKGROUND TXT",
  headingForegroundText = "FOREGROUND TXT",
  foregroundTextColor = "#7349ac"
}) => {
  return (
    <section className="testimonials-container">
      <ProcessHeading
        backgroundText={headingBackgroundText}
        foregroundText={headingForegroundText}
        foregroundTextColor={foregroundTextColor}
      />
      <div className="testimonials-section">
        <motion.div
          className="testimonial-track"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {testimonials.concat(testimonials).map((item, index) => (
            <div className="testimonial-card" key={index}>
              <img src={item.image} alt={item.name} className="testimonial-img" />
              <h3>{item.name}</h3>
              {item.role && <p className="testimonial-role">{item.role}</p>}
              <p>{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
