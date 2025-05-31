// src/components/LogoSlider.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import "../styles/logo-slider.css";
import { brandLogos as initialLogos } from "../data/brandLogos";

const NORMAL_SPEED = 50; // px per second
const SLOW_SPEED = 20;   // px per second when hovering

const LogoSlider = () => {
  const containerRef = useRef(null);
  const itemsRefs = useRef([]);
  const [logos, setLogos] = useState(initialLogos);
  const x = useMotionValue(0);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { root: null, threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frameId;
    let lastTs = performance.now();

    const loop = (now) => {
      const paused = !isVisible;
      const delta = now - lastTs;
      lastTs = now;

      if (!paused) {
        const speed = isHovering ? SLOW_SPEED : NORMAL_SPEED;
        const deltaPx = (speed * delta) / 1000;
        let nextX = x.get() - deltaPx;

        const firstEl = itemsRefs.current[0];
        if (firstEl) {
          const style = getComputedStyle(firstEl);
          const marginLeft = parseFloat(style.marginLeft) || 0;
          const marginRight = parseFloat(style.marginRight) || 0;
          const totalWidth = firstEl.offsetWidth + marginLeft + marginRight;

          if (nextX <= -totalWidth) {
            nextX += totalWidth;
            setLogos((prev) => {
              if (prev.length <= 1) return prev;
              const [first, ...rest] = prev;
              return [...rest, first];
            });
            if (itemsRefs.current.length > 1) {
              const shifted = itemsRefs.current.shift();
              if (shifted !== undefined) {
                itemsRefs.current.push(shifted);
              }
            }
          }
        }

        x.set(nextX);
      }

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible, isHovering, x]);

  return (
    <div
      className="logo-slider"
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div className="logo-track" style={{ x }}>
        {logos.map((logo, idx) => (
          <div
            className="logo-item"
            key={logo.id}
            ref={(el) => (itemsRefs.current[idx] = el)}
          >
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoSlider;
