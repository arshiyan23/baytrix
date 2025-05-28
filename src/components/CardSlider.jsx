import "../styles/card-slider.css";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProcessHeading from "./ProcessHeading";
import { useNavigate } from "react-router-dom";

const cardData = [
    { title: "BRANDING", image: "/assets/branding-2.png", description: "Build a unique Brand identity through graphical content", link: "/branding", color: "#8a5fd1" },
    { title: "APPLICATION DESIGN", image: "/assets/app-design.png", description: "Mobile apps, web apps, websites, and full-stack digital platforms", link: "/application-design", color: "#5c6bc0" },
    { title: "SOCIAL MEDIA MANAGEMENT", image: "/assets/smm-2.png", description: "Grow your audience across social media platforms.", link: "/social-media-management", color: "#d675b9" },
    { title: "MARKETING ADS", image: "/assets/marketing-ads.png", description: "SEO to boost brand visibility, along with content, and PPC strategies.", link: "/marketing-ads", color: "#8a5fd1" },
];

export default function CardSlider() {
    const navigate = useNavigate();
    const sectionRef = useRef(null);

    // MOBILE DETECTION
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" && window.innerWidth < 768
    );
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // DESKTOP: scroll-driven reveal
    const startOffset = isMobile ? 0 : 0.9;
    const endOffset = isMobile ? 0 : 1;
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: [`start ${startOffset}`, `end ${endOffset}`],
    });

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
                    // determine slide-in direction on mobile
                    const slideX = index < 2 ? -50 : 50;

                    // scroll transforms (desktop only)
                    const xDesktop = useTransform(
                        scrollYProgress,
                        [0, 1],
                        index < 2 ? ["-300px", "0px"] : ["300px", "0px"]
                    );
                    const opacityDesktop = useTransform(
                        scrollYProgress,
                        [0, 0.6, 1],
                        [0, 0.2, 1]
                    );

                    // expand widths (hover on desktop, click on mobile if you want)
                    let targetWidth = 280;
                    if (activeIndex !== null) {
                        targetWidth = activeIndex === index ? 550 : 200;
                    }
                    const isExpanded = activeIndex === index;
                    const isSqueezed = activeIndex !== null && activeIndex !== index;
                    const isIdle = activeIndex === null;

                    return (
                        <motion.div
                            key={index}
                            className="srvc-card"
                            style={{
                                backgroundColor: card.color,
                                // on desktop use scroll transforms, on mobile skip them
                                ...(isMobile
                                    ? {}
                                    : { x: xDesktop, opacity: opacityDesktop }),
                            }}
                            // MOBILE: fade+slide in when in view
                            {...(isMobile && {
                                initial: { opacity: 0, x: slideX },
                                whileInView: { opacity: 1, x: 0 },
                                viewport: { once: true, amount: 0.4 },
                            })}
                            // expand logic unchanged
                            animate={{ width: targetWidth }}
                            transition={{
                                width: { type: "spring", stiffness: 200, damping: 35 },
                                default: { duration: 0.6 },
                            }}
                            onMouseEnter={() => !isMobile && setActiveIndex(index)}
                            onMouseLeave={() => !isMobile && setActiveIndex(null)}
                            onClick={() => isMobile && navigate(card.link)}
                        >
                            {/* TITLE */}
                            <motion.h1
                                className="srvc-card-title"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{
                                    top: isMobile? "45%": "50%",
                                    left: "50%",
                                    x: "-50%",
                                    y: "-50%",
                                    fontSize: isExpanded ? "1.8rem" : "1.35rem",
                                    opacity: 1,
                                    // only rotate on desktop squeeze
                                    rotate: isMobile ? 0 : (isSqueezed ? -90 : 0),
                                    transformOrigin: "center center",
                                }}
                                transition={{ type: "spring", stiffness: 170, damping: 30 }}
                            >
                                {card.title}
                            </motion.h1>

                            <img
                                src={card.image}
                                alt={card.title}
                                className="srvc-card-image"
                            />

                            {/* DESCRIPTION & BUTTON */}
                            <motion.div
                                className="srvc-card-content"
                                initial={false}
                                animate={{
                                    top: isMobile
                                        ? "75%"                   // mobile: always under title
                                        : isExpanded
                                            ? "70%"
                                            : "60%",
                                    left: "50%",
                                    x: "-50%",
                                    y: "-50%",
                                    opacity: isSqueezed ? 0 : 1,
                                    pointerEvents: isSqueezed ? "none" : "auto",
                                }}
                                transition={{ duration: 0.4 }}
                            >
                                <motion.p
                                    // MOBILE: fade+slide up on view
                                    {...(isMobile && {
                                        initial: { opacity: 0, y: 20 },
                                        whileInView: { opacity: 1, y: 0 },
                                        viewport: { once: true, amount: 0.4 },
                                        transition: { duration: 0.5, delay: 0.2 },
                                    })}
                                    // DESKTOP: fade only on expand
                                    {...(!isMobile && {
                                        animate: { opacity: isExpanded ? 1 : 0 },
                                        transition: { duration: 0.4, delay: isExpanded ? 0.2 : 0 },
                                    })}
                                >
                                    {card.description}
                                </motion.p>

                                <motion.button
                                    {...(isMobile && {
                                        initial: { opacity: 0, y: 20 },
                                        whileInView: { opacity: 1, y: 0 },
                                        viewport: { once: true, amount: 0.4 },
                                        transition: { duration: 0.5, delay: 0.3 },
                                    })}
                                    {...(!isMobile && {
                                        animate: { opacity: isExpanded || isIdle ? 1 : 0 },
                                        transition: { duration: 0.4, delay: 0.1 },
                                    })}
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
}
