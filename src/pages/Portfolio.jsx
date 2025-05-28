import React, { useEffect, useRef, useState } from "react";
import "../styles/portfolio.css";
import PortfolioGallery from "../components/PortfolioGallery";

const Portfolio = () => {
    const statsRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    const [count4, setCount4] = useState(0);
    const [count5, setCount5] = useState(0);

    // Trigger animation on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasAnimated(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    // Count-up animation
    useEffect(() => {
        if (!hasAnimated) return;

        const animateCount = (target, setter) => {
            let frame = 0;
            const duration = 3000;
            const fps = 60;
            const totalFrames = (duration / 500) * fps;

            const interval = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                const easeOut = 1 - Math.pow(2, -10 * progress);
                const current = Math.round(target * easeOut);

                setter(current);
                if (frame === totalFrames) clearInterval(interval);
            }, 1000 / fps);
        };

        animateCount(50, setCount1);
        animateCount(30, setCount2);
        animateCount(10, setCount3);
        animateCount(15, setCount4);
        animateCount(25, setCount5);
    }, [hasAnimated]);

    return (
        <div className="portfolio-page">
            <section className="portfolio-page-hero-portfolio">
                <div className="hero-portfolio-content">
                    <h1>OUR PORTFOLIO</h1>
                    <p>
                        Dive into our digital masterpieces — from 
                        Branding and App Design to Social Media Management, And Marketing Ads.
                        We bring innovation, creativity, and results.
                    </p>

                    {/* Updated Stats Section */}
                    <div className="stat-portfolio-pages" ref={statsRef}>
                        <div className="stat-portfolio-page-box industries-box">
                            <div className="inner-stats">
                                <div className="inner-stat-item">
                                    <img
                                        src="https://img.icons8.com/ios-filled/50/ffffff/briefcase.png"
                                        alt="Projects icon"
                                    />
                                    <h3>{count1}+</h3>
                                    <p>Projects Completed</p>
                                </div>
                                <div className="inner-stat-item">
                                    <img
                                        src="https://img.icons8.com/ios-filled/48/ffffff/domain.png"
                                        alt="Industries icon"
                                    />
                                    <h3>{count3}+</h3>
                                    <p>Industries Served</p>
                                </div>
                                <div className="inner-stat-item">
                                    <img
                                        src="https://img.icons8.com/ios-filled/50/ffffff/groups.png"
                                        alt="Clients icon"
                                    />
                                    <h3>{count2}+</h3>
                                    <p>Happy Clients</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="hero-portfolio-image">
                    <img src={"/assets/portfolio.png"} alt="Portfolio Visual" />
                </div>
            </section>
            <PortfolioGallery />
        </div>
    );
};

export default Portfolio;
