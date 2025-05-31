import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import "../styles/branding.css";
import ScheduleCall from '../components/ScheduleCall';
import ProcessHeading from "../components/ProcessHeading";
import FloatingIcons from "../components/FloatingIcons";
import Carousel3D from "../components/Carousel3D";

const features = [
  {
    title: "Color Palette",
    desc: "We define a consistent and appealing set of colors that represent your brand’s personality.",
    icon: "/assets/branding-color.webp",
  },
  {
    title: "Logo Design",
    desc: "We craft versatile and memorable logos that visually communicate your brand essence.",
    icon: "/assets/branding-logo.webp",
  },
  {
    title: "Slogan & Tagline",
    desc: "We help define catchy slogans that reflect your brand’s mission and voice.",
    icon: "/assets/branding-slogan.webp",
  },
  {
    title: "Typography",
    desc: "We select and pair fonts that enhance readability and brand recognition.",
    icon: "/assets/branding-typography.webp",
  },
  {
    title: "Imagery Style",
    desc: "We establish consistent visuals, illustrations, and photography direction.",
    icon: "/assets/branding-imagery.webp",
  },
  {
    title: "Complete Identity",
    desc: "We shape a unified brand system — from tone to visual impact — across all channels.",
    icon: "/assets/branding-identity.webp",
  },
];

const brandingSteps = [
  {
    number: 1,
    title: "Initial Discovery & Brand Understanding",
    description: "We dive deep into your business, goals, and audience through collaborative sessions and audits to define what makes your brand unique.",
  },
  {
    number: 2,
    title: "Brand Core & Voice Definition",
    description: "We establish your brand’s personality, tone, and messaging pillars to build an emotional connection with your audience.",
  },
  {
    number: 3,
    title: "Visual Identity Strategy",
    description: "We translate your brand’s core into visual direction—creating mood boards and creative guidelines for a cohesive aesthetic.",
  },
  {
    number: 4,
    title: "Logo Concept & Design",
    description: "Our team develops scalable logo concepts, refining them with you until they perfectly capture your brand essence.",
  },
  {
    number: 5,
    title: "Typography & Color System",
    description: "We select fonts and colors that reflect your identity, ensuring recognition, accessibility, and impact across all platforms.",
  },
  {
    number: 6,
    title: "Final Identity & Brand Guidelines",
    description: "We compile all visual and verbal elements into a comprehensive brand guidelines document for consistent application.",
  },
];

const importanceItems = [
  {
    title: "Establish Credibility",
    desc: "A solid brand identity builds confidence and positions you as an industry authority.",
    icon: "/assets/credebility.webp",
  },
  {
    title: "Stand Out Visually",
    desc: "Unique design elements and messaging make your brand memorable in a crowded market.",
    icon: "/assets/person-find.webp",
  },
  {
    title: "Inspire Customer Loyalty",
    desc: "Authentic brand experiences turn customers into repeat buyers and enthusiastic advocates.",
    icon: "/assets/loyalty.webp",
  },
];

const cardData = [
  {
    title: 'Dynamic Visuals',
    image: '/assets/portfolio/kartspace/kartspace-cart.webp',
    imageBlur: '/assets/portfolio/kartspace/kartspace-cart-blur.webp',
  },
  {
    title: 'Immersive Branding',
    image: '/assets/portfolio/tradewise/mockup-thumbnail.webp',
    imageBlur: '/assets/portfolio/tradewise/mockup-thumbnail-blur.webp',
  },
  {
    title: 'Creative Execution',
    image: '/assets/portfolio/kartspace/kartspace-cart.webp',
    imageBlur: '/assets/portfolio/kartspace/kartspace-cart-blur.webp',
  },
  {
    title: 'Strategic Design',
    image: '/assets/portfolio/kartspace/kartspace-cart.webp',
    imageBlur: '/assets/portfolio/kartspace/kartspace-cart-blur.webp',
  },
  {
    title: 'Engaging Interfaces',
    image: '/assets/portfolio/kartspace/kartspace-cart.webp',
    imageBlur: '/assets/portfolio/kartspace/kartspace-cart-blur.webp',
  },
];



function Branding() {

  //features grid animation 
  const gridRef = useRef(null);
const [rowIndexes, setRowIndexes] = useState([]);

useEffect(() => {
  const updateRowIndexes = () => {
    const container = gridRef.current;
    if (!container) return;

    const cards = Array.from(container.children);
    let currentTop = null;
    let currentRow = 0;
    const indexes = [];

    for (let i = 0; i < cards.length; i++) {
      const top = cards[i].getBoundingClientRect().top;

      if (currentTop === null || Math.abs(top - currentTop) > 10) {
        currentRow++;
        currentTop = top;
      }

      indexes.push(currentRow);
    }

    setRowIndexes(indexes);
  };

  const observer = new ResizeObserver(updateRowIndexes);
  if (gridRef.current) observer.observe(gridRef.current);
  window.addEventListener("resize", updateRowIndexes);
  updateRowIndexes();

  return () => {
    if (gridRef.current) observer.unobserve(gridRef.current);
    window.removeEventListener("resize", updateRowIndexes);
  };
}, []);


  // state tracking for timeline section
  const [isTrackInView, setIsTrackInView] = useState(false);
  const trackWrapperRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTrackInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (trackWrapperRef.current) {
      observer.observe(trackWrapperRef.current);
    }

    return () => {
      if (trackWrapperRef.current) {
        observer.unobserve(trackWrapperRef.current);
      }
    };
  }, []);

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

      if (!isPaused && isTrackInView) {
        const speed = 30;
        const movement = (speed * delta) / 800;
        const trackWidth = trackRef.current.scrollWidth / 2;

        let newX = x.get() - movement;
        if (Math.abs(newX) >= trackWidth) newX = 0;

        x.set(newX);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isTrackInView, x]);


  return (
    <>
      {/* HERO SECTION */}
      <section className="brnd-hero-section">
        <FloatingIcons category="branding" />
        <div className="brnd-hero-container">
          <img
            src="/assets/branding-intro2.webp"
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

      <Carousel3D
        cards={cardData}
      />

      {/* importance of branding */}

      <section className="brnd-importance-section">
        <ProcessHeading
          foregroundText="WHY BRANDING MATTERS"
          backgroundText="IMPORTANCE"
          description="Branding is crucial because it creates recognition and trust, 
            turning your business into a memorable presence that customers feel 
            confident in and return to again and again."
        //  backgroundTextFill="#f5f0ff"
        />
        <motion.div
          className="brnd-importance-grid"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 1 }} // Only when 100% of the grid is visible
        >
          {importanceItems.map((item, i) => {
            let variants = {};

            if (i === 0) {
              variants = {
                initial: { x: -100, opacity: 0 },
                animate: { x: 0, opacity: 1 },
              };
            } else if (i === 1) {
              variants = {
                initial: { y: 100, opacity: 0 },
                animate: { y: 0, opacity: 1 },
              };
            } else if (i === 2) {
              variants = {
                initial: { x: 100, opacity: 0 },
                animate: { x: 0, opacity: 1 },
              };
            }

            return (
              <motion.div
                key={i}
                className="brnd-importance-card"
                variants={variants}
                transition={{
                  duration: 0.6,
                  delay: i * 0.2,
                  type: "spring",
                  stiffness: 70,
                }}
              >
                <img src={item.icon} alt={item.title} className="brnd-importance-icon" />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
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
          description="We follow a structured, creative 
          approach to shape your brand’s identity—from discovery and 
          strategy to visuals and final delivery. Every step ensures consistency and impact."
        />

        <div
          className="branding-process-track-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={trackWrapperRef}
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
      {showScheduleCall && (
        <ScheduleCall onClose={() => setShowScheduleCall(false)} />
      )}
    </>
  );
}

export default Branding;
