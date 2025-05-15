import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import "../styles/logo-slider.css";
import { logoSvgs } from "../data/logos"; 

const LogoSlider = () => {
  const x = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let lastTimestamp = performance.now();

    const loop = (timestamp) => {
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (!isPaused) {
        const speed = 50;
        const movement = (speed * delta) / 1000;
        const trackWidth = trackRef.current.scrollWidth / 2;

        let newX = x.get() - movement;
        if (Math.abs(newX) >= trackWidth) newX = 0;

        x.set(newX);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, x]);

  return (
    <section className="logo-slider-container">
      <div
        className="logo-slider-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div className="logo-slider-track" style={{ x }} ref={trackRef}>
          {[...logoSvgs, ...logoSvgs].map((item, index) => (
            <div className="logo-svg-wrapper" key={index} title={item.title}>
              {item.svg}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoSlider;
