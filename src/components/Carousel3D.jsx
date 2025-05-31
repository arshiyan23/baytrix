import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ProcessHeading from './ProcessHeading';
import '../styles/carousel-3d.css';

const MAX_VISIBILITY = 3;

const Card = ({ image }) => (
    <div className="crsl-card">
        <img src={image} alt="" className="crsl-image" />
    </div>
);

const ChevronLeftIcon = () => (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
);

const Carousel3D = ({ cards }) => {
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState(0); // +1 for next, -1 for prev (used in snapping logic)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [slideWidth, setSlideWidth] = useState(0);
    const count = cards.length;

    // Ref to the <div className="crsl-3d"> so we can measure its width precisely
    const containerRef = useRef(null);

    // Framer Motion controls for manual animations (allows snapping back even if active doesn't change)
    const controls = useAnimation();

    // ─────────────────────────────────────────────────────────────────────────────
    // Listen for window resize and recalc both isMobile and slideWidth
    // ─────────────────────────────────────────────────────────────────────────────
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);

            if (mobile && containerRef.current) {
                // Measure the exact rendered width of .crsl-3d
                const { width } = containerRef.current.getBoundingClientRect();
                setSlideWidth(width);

                // Immediately snap track to current active if resizing while mobile
                controls.set({ x: -active * width });
            } else {
                // Reset or ignore when not mobile
                setSlideWidth(0);
            }
        };

        // Initial measurement on mount
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [active, controls]);

    // Whenever `active` or `slideWidth` changes on mobile, animate the track to align exactly
    useEffect(() => {
        if (isMobile && slideWidth > 0) {
            controls.start({
                x: -active * slideWidth,
                transition: { type: 'tween', duration: 0.3 },
            });
        }
    }, [active, slideWidth, isMobile, controls]);

    // Auto-advance every 2 seconds (commented out by default)
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setDirection(1);
    //         setActive(prev => (prev + 1) % count);
    //     }, 2000);
    //     return () => clearInterval(interval);
    // }, [count]);

    const handlePrev = () => {
        setDirection(-1);
        setActive(prev => (prev - 1 + count) % count);
    };

    const handleNext = () => {
        setDirection(1);
        setActive(prev => (prev + 1) % count);
    };

    return (
        <div className="crsl-wrapper" id="carousel-section">
            <ProcessHeading
                foregroundText="UNIQUE VISUALS"
                backgroundText="CREATIONS"
                description="Discover how we bring brands to life through bold visual storytelling."
            />

            <div className="crsl-container">
                {/* ─────────────────────────────────────────────────────────────────────
                    If we're on mobile (≤768px), render a flat, swipeable gallery.
                    Otherwise (desktop/tablet), render the original 3D carousel.
                ───────────────────────────────────────────────────────────────────── */}
                {isMobile ? (
                    <div className="crsl-3d" ref={containerRef}>
                        {/* ─── The “track” that holds all cards side-by-side ─── */}
                        <motion.div
                            className="mobile-carousel-track"
                            drag="x"
                            dragConstraints={{
                                // Constrain dragging to exactly (count - 1) * slideWidth
                                left: -((count - 1) * slideWidth),
                                right: 0,
                            }}
                            dragElastic={0.05} // small elasticity, not too stretchy
                            onDragEnd={(_, info) => {
                                // ─────────────────────────────────────────────────────────────────
                                // Instead of jumping multiple slides, use a threshold:
                                // If offset < -20% of slideWidth → next slide.
                                // If offset > 20% of slideWidth → prev slide.
                                // Otherwise → snap back to current slide exactly.
                                // ─────────────────────────────────────────────────────────────────
                                const threshold = slideWidth * 0.2;
                                if (info.offset.x < -threshold && active < count - 1) {
                                    // Swiped left past threshold → advance exactly one
                                    setDirection(1);
                                    setActive(prev => prev + 1);
                                } else if (info.offset.x > threshold && active > 0) {
                                    // Swiped right past threshold → go back exactly one
                                    setDirection(-1);
                                    setActive(prev => prev - 1);
                                } else {
                                    // Not enough movement → snap back
                                    controls.start({
                                        x: -active * slideWidth,
                                        transition: { type: 'tween', duration: 0.3 },
                                    });
                                }
                            }}
                            animate={controls} 
                            style={{
                                display: 'flex',
                                width: slideWidth * count,
                                height: '100%',
                            }}
                        >
                            {cards.map((card, idx) => (
                                <div
                                    className="mobile-card"
                                    key={idx}
                                    style={{
                                        width: slideWidth,  // Exactly one container‐width
                                        height: '100%',
                                        flexShrink: 0,
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <Card image={card.image} />
                                </div>
                            ))}
                        </motion.div>

                        {/* Left/right chevron buttons still work on mobile */}
                        <button className="crsl-nav crsl-left" onClick={handlePrev}>
                            <ChevronLeftIcon />
                        </button>
                        <button className="crsl-nav crsl-right" onClick={handleNext}>
                            <ChevronRightIcon />
                        </button>
                    </div>
                ) : (
                    <div className="crsl-3d">
                        <button className="crsl-nav crsl-left" onClick={handlePrev}>
                            <ChevronLeftIcon />
                        </button>

                        {cards.map((card, i) => {
                            let offset = i - active;
                            if (offset > count / 2) offset -= count;
                            if (offset < -count / 2) offset += count;

                            const absOffset = Math.abs(offset);
                            if (absOffset > MAX_VISIBILITY) return null;

                            return (
                                <div
                                    key={i}
                                    className={`crsl-card-container${i === active ? ' active' : ''}`}
                                    style={{
                                        '--active': i === active ? 1 : 0,
                                        '--offset': offset / 3,
                                        '--direction': Math.sign(offset),
                                        '--abs-offset': absOffset / 3,
                                        pointerEvents: i === active ? 'auto' : 'none',
                                        opacity: absOffset >= MAX_VISIBILITY ? 0 : 1,
                                    }}
                                >
                                    {/* pass the blurred image for non-active cards */}
                                    <Card
                                        image={
                                            i === active
                                                ? card.image
                                                : card.imageBlur
                                        }
                                    />
                                </div>
                            );
                        })}

                        <button className="crsl-nav crsl-right" onClick={handleNext}>
                            <ChevronRightIcon />
                        </button>
                    </div>
                )}
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                {cards.map((_, idx) => (
                    <motion.span
                        key={idx}
                        initial={false}
                        animate={{ opacity: idx === active ? 1 : 0.5 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            width: '0.75rem',
                            height: '0.75rem',
                            borderRadius: '50%',
                            background: '#7349ac',
                            margin: '0 0.5rem',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            if (idx > active) {
                                setDirection(1);
                            } else if (idx < active) {
                                setDirection(-1);
                            }
                            setActive(idx);
                        }}
                    />
                ))}
            </div>

            {/* Global fading title */}
            <motion.div
                key={cards[active].title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="crsl-global-title"
            >
                <h3>{cards[active].title}</h3>
            </motion.div>
        </div>
    );
};

export default Carousel3D;
