import React, { useState } from 'react';
import '../styles/video-vouch.css';
import ProcessHeading from './ProcessHeading';

const QuoteIcon = () => <span className="quote-icon">“</span>;

const PlayIcon = () => (
    <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
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

const testimonials = [
    {
        thumbnailSrc: '/assets/man.png',
        videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
        quote: 'They helped us scale with beautiful UI and marketing. I highly recommend them to anyone seeking quality.',
        author: 'Sehajpal Singh',
        title: '/ Founder at GoWash',
        website: 'gowash.in',
    },
    {
        thumbnailSrc: '/assets/emiway-bantai-records.png',
        videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
        quote: 'Baytix truly transformed our online presence. Their service was excellent and truly exceeded expectations.',
        author: 'Emiway Bantai',
        title: '/ Founder at Bantai Records',
        website: 'bantai.in',
    },
    {
        thumbnailSrc: '/assets/tamer-compass.png',
        videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
        quote: 'Very professional attitude towards work and a great support staff. Amazing experience from start to finish!',
        author: 'Tamer Huwaidi',
        title: '/ Co-Founder & CEO at Bantai Records',
        website: 'compass.net',
    },
];

const VideoVouch = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const { thumbnailSrc, videoSrc, quote, author, title, website } = testimonials[currentIndex];

    const handlePrev = () => {
        setIsPlaying(false);
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setIsPlaying(false);
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="vouch-container" id='reviews'>
            <ProcessHeading
                backgroundText="REVIEWS"
                foregroundText="PROUD CLIENTS"
                description='We don’t just build brands — we build relationships.
                Hear from these business owners who trusted Baytix to bring their ideas to life.'
            />
            <div className='vouch-wrapper'>
                <div className="vouch-image-section">
                    {isPlaying ? (
                        <video
                            src={videoSrc}
                            controls
                            autoPlay
                            className="vouch-image"
                        />
                    ) : (
                        <>
                            <img
                                src={thumbnailSrc}
                                alt={author}
                                className="vouch-image"
                            />
                            <div
                                className="play-button-overlay"
                                onClick={() => setIsPlaying(true)}
                            >
                                <PlayIcon />
                            </div>
                        </>
                    )}
                </div>

                <div className="vouch-content-section">
                    <QuoteIcon />
                    <p className="vouch-quote">{quote}</p>
                    <p className="vouch-author">{author} <span className='vouch-title-span'>{title}</span></p>
                    <p className="vouch-website">{website}</p>
                    <div className="vouch-navigation">
                        <button className="nav-arrow left-arrow" onClick={handlePrev}>
                            <ChevronLeftIcon />
                        </button>
                        <div className='nav-arrow-spacer'></div>
                        <button className="nav-arrow right-arrow" onClick={handleNext}>
                            <ChevronRightIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoVouch;
