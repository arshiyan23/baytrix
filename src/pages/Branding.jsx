import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import "../styles/branding.css";
import ScheduleCall from '../components/ScheduleCall';
import ProcessHeading from "../components/ProcessHeading";
import FloatingIcons from "../components/FloatingIcons";

const features = [
  {
    title: "Color Palette",
    desc: "We define a consistent and appealing set of colors that represent your brand’s personality.",
    icon: "/assets/branding-color.png",
  },
  {
    title: "Logo Design",
    desc: "We craft versatile and memorable logos that visually communicate your brand essence.",
    icon: "/assets/branding-logo.png",
  },
  {
    title: "Slogan & Tagline",
    desc: "We help define catchy slogans that reflect your brand’s mission and voice.",
    icon: "/assets/branding-slogan.png",
  },
  {
    title: "Typography",
    desc: "We select and pair fonts that enhance readability and brand recognition.",
    icon: "/assets/branding-typography.png",
  },
  {
    title: "Imagery Style",
    desc: "We establish consistent visuals, illustrations, and photography direction.",
    icon: "/assets/branding-imagery.png",
  },
  {
    title: "Complete Identity",
    desc: "We shape a unified brand system — from tone to visual impact — across all channels.",
    icon: "/assets/branding-identity.png",
  },
];

const brandingSteps = [
  {
    number: 1,
    title: "Initial Discovery & Brand Understanding",
    description:
      "We start by understanding your business, goals, audience, and market landscape. Through collaborative sessions and brand audits, we identify what makes your brand unique and where it stands today.",
    icon: "/assets/branding-identity.png",
  },
  {
    number: 2,
    title: "Brand Core & Voice Definition",
    description:
      "Next, we define your brand’s personality, tone, and messaging pillars. This step establishes your brand’s core values, voice, and the emotional connection you want to build with your audience.",
    icon: "/assets/branding-slogan.png",
  },
  {
    number: 3,
    title: "Visual Identity Strategy",
    description:
      "We begin translating your brand’s core into visual direction — from mood boards to creative direction — outlining the style, imagery, and overall aesthetic the brand will follow.",
    icon: "/assets/branding-imagery.png",
  },
  {
    number: 4,
    title: "Logo Concept & Design",
    description:
      "Our design team creates a distinct, scalable logo that captures the brand essence. We explore multiple concepts and refine them in collaboration until we reach a mark that feels just right.",
    icon: "/assets/branding-logo.png",
  },
  {
    number: 5,
    title: "Typography & Color System",
    description:
      "We craft a complete typographic and color system that reflects your brand’s identity. These elements are selected to support recognition, accessibility, and emotional impact across all mediums.",
    icon: "/assets/branding-color.png",
  },
  {
    number: 6,
    title: "Final Identity & Brand Guidelines",
    description:
      "All visual and verbal elements are brought together into a detailed brand guidelines document. This ensures consistency in how your brand appears across digital and physical platforms going forward.",
    icon: "/assets/branding-typography.png",
  },
];

function Branding() {
  //schedule a meeting section
  const [showScheduleCall, setShowScheduleCall] = useState(false);
  useEffect(() => {
    const items = document.querySelectorAll(".timeline-item");

    const timelineObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            timelineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach(item => timelineObserver.observe(item));

    return () => timelineObserver.disconnect();
  }, []);


  // SLIDER SECTION JS
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
        const speed = 30;
        const movement = (speed * delta) / 400;
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
    <>
      {/* HERO SECTION */}
      <section className="brnd-hero-section">
        <FloatingIcons category="branding" />
        <div className="brnd-hero-container">
          <img
            src="/assets/branding-intro2.png"
            alt="Branding Intro"
            className="brnd-hero-img"
          />
          <div className="brnd-hero-text">
            <h2>BRANDING</h2>
            <p>
              We help you build a brand, not just a business — with stunning
              visuals, consistent messaging, and a unique identity.
            </p>
            <button
              className="cta-button"
              onClick={() => setShowScheduleCall(true)}
            >
              BOOK A FREE CONSULTATION
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="brnd-features-section">
        <ProcessHeading
          foregroundText="WHAT WE HANDLE"
          backgroundText="SERVICES"
          description="From color palettes and logo design to typography and imagery, we build every visual and verbal 
          element your brand needs to stand out and stay consistent across all platforms."
        />
        <div className="brnd-features-grid">
          {features.map((f, i) => (
            <div key={i} className="brnd-feature-card">
              <img
                src={f.icon}
                alt={f.title}
                className="brnd-feature-icon"
              />
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div className="brnd-hover-border" />
            </div>
          ))}
        </div>
      </section>

      {/* SLIDER SECTION */}

      <section className="branding-process-container">
        <ProcessHeading
          foregroundText="OUR TIMELINE"
          backgroundText="PROCEDURE"
          backgroundTextFill="#f5f0ff"
          description="We follow a structured, creative 
          approach to shape your brand’s identity—from discovery and 
          strategy to visuals and final delivery. Every step ensures consistency and impact."
        />

        <div
          className="branding-process-track-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          <motion.div className="branding-process-track" style={{ x }} ref={trackRef}>
            {[...brandingSteps, ...brandingSteps].map((step, index) => (
              <div className="branding-card" key={index}>
                <div className="branding-number">{step.number}</div>
                <div className="branding-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      );
      {showScheduleCall && (
        <ScheduleCall onClose={() => setShowScheduleCall(false)} />
      )}
    </>
  );
}

export default Branding;
