// src/components/LogoSlider.jsx
import React, {
  useLayoutEffect,
  useEffect,
  useRef,
  useState
} from "react";
import { motion, useMotionValue } from "framer-motion";
import "../styles/logo-slider.css";
import { brandLogos } from "../data/brandLogos";

const LogoSlider = () => {
  const x = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [singleTrackWidth, setSingleTrackWidth] = useState(0);
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  // If there's exactly one logo, render it centered and static
  if (brandLogos.length === 1) {
    return (
      <section className="logo-slider-container">
        <div className="logo-slider-static">
          <div className="logo-img-wrapper">
            <img
              src={brandLogos[0].src}
              alt={brandLogos[0].alt}
              className="logo-img"
            />
          </div>
        </div>
      </section>
    );
  }

  // Duplicate the array internally so we can loop seamlessly
  const allLogos = [...brandLogos, ...brandLogos];

  // 1) Measure widths before paint; set initial x = containerWidth (off-screen right)
  useLayoutEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    // Width of the visible window
    const W = containerRef.current.offsetWidth;
    // scrollWidth of the DUPLICATED track = 2 * singleTrackWidth
    const totalTrackW = trackRef.current.scrollWidth;
    const S = totalTrackW / 2;

    setContainerWidth(W);
    setSingleTrackWidth(S);

    // Start with the FIRST logo off-screen on the right
    x.set(W);
  }, [brandLogos, x]);

  // 2) Re-measure on window resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !trackRef.current) return;
      const W = containerRef.current.offsetWidth;
      const totalTrackW = trackRef.current.scrollWidth;
      const S = totalTrackW / 2;

      setContainerWidth(W);
      setSingleTrackWidth(S);
      x.set(W);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [brandLogos, x]);

  // 3) Animation loop: move left; when one set has fully passed, reset to containerWidth
  useEffect(() => {
    if (containerWidth === 0 || singleTrackWidth === 0) return;

    let frameId;
    let lastTs = performance.now();

    const loop = (now) => {
      const delta = now - lastTs;
      lastTs = now;

      if (!isPaused) {
        const speed = 50; // px per second
        const distance = (speed * delta) / 1000;
        const currentX = x.get();
        let nextX = currentX - distance;

        // When we've scrolled exactly one singleTrackWidth to the left,
        // the second copy's first logo is flush left. Snap back to W.
        if (nextX <= -singleTrackWidth) {
          nextX = containerWidth;
        }

        x.set(nextX);
      }

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, x, containerWidth, singleTrackWidth]);

  return (
    <section className="logo-slider-container">
      <div
        className="logo-slider-section"
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="logo-slider-track"
          style={{ x }}
          ref={trackRef}
        >
          {allLogos.map((brand, idx) => (
            <div className="logo-img-wrapper" key={idx}>
              <a href={brand.url} target="_blank" rel="noopener noreferrer">
                <img src={brand.src} alt={brand.alt} className="logo-img" />
              </a>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoSlider;
