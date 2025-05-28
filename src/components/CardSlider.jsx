import "../styles/card-slider.css";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

    // track mobile vs desktop
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" && window.innerWidth < 768
    );
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    // use a tighter start on mobile
    const startOffset = isMobile ? 0.7 : 0.9;
    const endOffset = isMobile ? 1.15 : 1;
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
                    const isLeft = index < cardData.length / 2;
                    const x = useTransform(
                        scrollYProgress,
                        [0, 1],
                        isLeft ? ["-300px", "0px"] : ["300px", "0px"]
                    );
                    const opacity = useTransform(
                        scrollYProgress,
                        [0, 0.6, 1],
                        [0, 0.2, 1]
                    );

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
                            style={{ backgroundColor: card.color, x, opacity }}
                            animate={{ width: targetWidth }}
                            transition={{
                                width: { type: "spring", stiffness: 200, damping: 35 },
                                default: { duration: 0.6 },
                            }}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            onClick={() => navigate(card.link)}
                        >
                            <motion.h1
                                className="srvc-card-title"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{
                                    top: isExpanded || isSqueezed ? "50%" : "50%",
                                    left: "50%",
                                    x: "-50%",
                                    y: "-50%",
                                    fontSize: isExpanded ? "1.8rem" : "1.35rem",
                                    opacity: 1,
                                    rotate: isSqueezed ? -90 : 0,
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

                            <motion.div
                                className="srvc-card-content"
                                initial={false}
                                animate={{
                                    top: isExpanded ? "70%" : "60%",
                                    left: "50%",
                                    x: "-50%",
                                    y: "-50%",
                                    opacity: isSqueezed ? 0 : 1,
                                    pointerEvents: isSqueezed ? "none" : "auto",
                                }}
                                transition={{ duration: 0.4 }}
                            >
                                <motion.p
                                    initial={{ opacity: 1 }}
                                    animate={{
                                        opacity: isExpanded ? 1 : 0,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: isExpanded ? 0.2 : 0,
                                    }}
                                >
                                    {card.description}
                                </motion.p>

                                <motion.button
                                    animate={{
                                        opacity: isExpanded || isIdle ? 1 : 0,
                                        y: isExpanded ? 0 : 0,
                                    }}
                                    transition={{ delay: 0.1, duration: 0.4 }}
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
