import "../styles/card-slider.css";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProcessHeading from "./ProcessHeading";
import { useNavigate } from "react-router-dom";

const cardData = [
  {
    title: "BRANDING",
    image: "/assets/branding-2.png",
    description: "Build a strong Brand identity through graphical content",
    link: "/branding",
    color: "#8a5fd1",
  },
  {
    title: "APPLICATION DESIGN",
    image: "/assets/app-design.png",
    description: "Mobile apps, web apps, websites, and full-stack digital platforms",
    link: "/application-design",
    color: "#5c6bc0",
  },
  {
    title: "SOCIAL MEDIA MANAGEMENT",
    image: "/assets/smm-2.png",
    description: "Grow your audience across social media platforms.",
    link: "/social-media-management",
    color: "#d675b9",
  },
  {
    title: "MARKETING ADS",
    image: "/assets/marketing-ads.png",
    description: "SEO to boost brand visibility, along with content, and PPC strategies.",
    link: "/marketing-ads",
    color: "#8a5fd1",
  },
];

const CardSlider = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div ref={sectionRef} className="srvc-card-slider-frame">
      <ProcessHeading
        foregroundText="OUR SERVICES"
        backgroundText="EXPERTISE"
        description="We empower businesses with innovative digital strategies that build strong identities, boost engagement, and drive measurable growth across platforms."
      />

      <div className="srvc-card-slider">
        {cardData.map((card, index) => {
          // Expand widths
          let targetWidth = 280;
          if (activeIndex !== null) {
            targetWidth = activeIndex === index ? 550 : 200;
          }

          const isExpanded = activeIndex === index;
          const isSqueezed = activeIndex !== null && activeIndex !== index;
          const isIdle = activeIndex === null;

          // Mobile slide direction: top two from left, bottom two from right
          const slideX = index < 2 ? -50 : 50;

          return (
            <motion.div
              key={index}
              className="srvc-card"
              style={{ backgroundColor: card.color }}
              initial={ isMobile ? { opacity: 0, x: slideX } : { opacity: 0 } }
              whileInView={ isMobile ? { opacity: 1, x: 0 } : { opacity: 1 } }
              viewport={{ once: true, amount: 0.4 }}
              animate={{ width: targetWidth }}
              transition={{
                width: { type: "spring", stiffness: 200, damping: 35 },
                default: { duration: 0.6 },
              }}
              onMouseEnter={() => !isMobile && setActiveIndex(index)}
              onMouseLeave={() => !isMobile && setActiveIndex(null)}
              onClick={() => navigate(card.link)}
            >
              {/* TITLE: no rotate on mobile */}
              <motion.h1
                className="srvc-card-title"
                initial={ isMobile ? { opacity: 0, y: -20, rotate: 0 } : { opacity: 0, y: -20 } }
                animate={{
                  top: "50%",
                  left: "50%",
                  x: "-50%",
                  y: "-50%",
                  fontSize: isExpanded ? "1.8rem" : "1.35rem",
                  opacity: 1,
                  rotate: isMobile ? 0 : (isSqueezed ? -90 : 0),
                  transformOrigin: "center center",
                }}
                transition={{
                  type: "spring",
                  stiffness: 170,
                  damping: 30,
                }}
              >
                {card.title}
              </motion.h1>

              <img
                src={card.image}
                alt={card.title}
                className="srvc-card-image"
              />

              {/* DESC & BUTTON: FADE SLIDE FROM BOTTOM ON MOBILE */}
              <motion.div
                className="srvc-card-content"
                initial={false}
                animate={{
                  top: isMobile
                    ? (isExpanded ? "75%" : "75%")
                    : (isExpanded ? "70%" : "60%"),
                  left: "50%",
                  x: "-50%",
                  y: "-50%",
                  opacity: isSqueezed ? 0 : 1,
                  pointerEvents: isSqueezed ? "none" : "auto",
                }}
                transition={{ duration: 0.4 }}
              >
                <motion.p
                  initial={ isMobile ? { opacity: 0, y: 20 } : undefined }
                  whileInView={ isMobile ? { opacity: 1, y: 0 } : undefined }
                  viewport={ isMobile ? { once: true, amount: 0.4 } : undefined }
                  animate={ !isMobile ? { opacity: isExpanded ? 1 : 0 } : undefined }
                  transition={ isMobile ? { duration: 0.5, delay: 0.2 } : { duration: 0.4, delay: isExpanded ? 0.2 : 0 } }
                >
                  {card.description}
                </motion.p>

                <motion.button
                  initial={ isMobile ? { opacity: 0, y: 20 } : undefined }
                  whileInView={ isMobile ? { opacity: 1, y: 0 } : undefined }
                  viewport={ isMobile ? { once: true, amount: 0.4 } : undefined }
                  animate={ !isMobile ? { opacity: isExpanded || isIdle ? 1 : 0 } : undefined }
                  transition={ isMobile ? { duration: 0.5, delay: 0.3 } : { delay: 0.1, duration: 0.4 } }
                >
                  View More
                </motion.button>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CardSlider;
