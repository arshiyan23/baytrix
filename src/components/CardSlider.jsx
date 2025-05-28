import "../styles/card-slider.css";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProcessHeading from "./ProcessHeading";

const cardData = [
    {
        title: "Branding",
        image: "/assets/branding-2.png",
        description: "Build a strong Brand identity through graphical content",
        link: "/branding",
        color: "#8a5fd1", // softer violet, analogous to #7349ac
    },
    {
        title: "Application Design",
        image: "/assets/app-design.png",
        description: "Mobile apps, web apps, websites, and full-stack digital platforms",
        link: "/application-design",
        color: "#b678f1", // lighter lavender, complements your purple
    },
    {
        title: "Social Media Management",
        image: "/assets/smm-2.png",
        description: "Grow your audience across social media platforms.",
        link: "/social-media-management",
        color: "#5c6bc0", // muted indigo, gives balance
    },
    {
        title: "Marketing Ads",
        image: "/assets/marketing-ads.png",
        description: "SEO to boost brand visibility, along with content, and PPC strategies.",
        link: "/marketing-ads",
        color: "#a463c7", // rich pinkish purple, in your color family
    },
];

const CardSlider = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 0.9", "end 1"],
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
                    const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [
                        0,
                        0.2,
                        1,
                    ]);

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
                        >
                            <motion.h2
                                className="srvc-card-title"
                                animate={{
                                    top: isExpanded || isSqueezed ? "50%" : "1rem",
                                    left: "50%",
                                    x: "-50%",
                                    y: isExpanded || isSqueezed ? "-50%" : "0%",
                                    fontSize: isExpanded ? "1.8rem" : "1.5rem",
                                    opacity: isSqueezed ? 1 : 1, 
                                    rotate: isSqueezed ? -90 : 0, //rotates the title 
                                    transformOrigin: isSqueezed ? "center center" : "top left"
                                }}
                                initial={{ opacity: 0, y: -20 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 170,
                                    damping: 30,
                                }}
                            >
                                {card.title}
                            </motion.h2>
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
                                    animate={{
                                        opacity: isExpanded || isIdle ? 1 : 0,
                                        y: isExpanded ? 0 : 0,
                                    }}
                                    transition={{ delay: 0.05, duration: 0.4 }}
                                >
                                    {card.description}
                                </motion.p>
                                <motion.button
                                    animate={{
                                        opacity: isExpanded || isIdle ? 1 : 0,
                                        y: isExpanded ? 0 : 0,
                                    }}
                                    transition={{ delay: 0.1, duration: 0.4 }}
                                    onClick={() => {}}
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
