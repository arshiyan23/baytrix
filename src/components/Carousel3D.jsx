import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    const count = cards.length;

    // Auto-advance every 2 seconds
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setActive(prev => (prev + 1) % count);
    //     }, 2000);
    //     return () => clearInterval(interval);
    // }, [count]);

    const handlePrev = () => setActive(prev => (prev - 1 + count) % count);
    const handleNext = () => setActive(prev => (prev + 1) % count);

    return (
        <div className="crsl-wrapper" id="carousel-section">
            <ProcessHeading
                foregroundText="UNIQUE VISUALS"
                backgroundText="CREATIONS"
                description="Discover how we bring brands to life through bold visual storytelling."
            />

            <div className="crsl-container">
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
                                className="crsl-card-container"
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
                            cursor: 'pointer'
                        }}
                        onClick={() => setActive(idx)}
                    />
                ))}
            </div>
            {/* Global fading title */}
            <AnimatePresence mode="wait">
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
            </AnimatePresence>
        </div>
    );
};

export default Carousel3D;
