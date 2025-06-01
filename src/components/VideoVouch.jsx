import React, { useState, useEffect } from 'react';
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
        thumbnailSrc: '/assets/sandy-vouch.webp',
        videoSrc: 'https://ia800800.us.archive.org/9/items/sandy_testimonial/sandy-2.webm',
        quote: 'Baytix truly transformed my online presence. Their service was excellent and truly exceeded expectations.',
        author: 'Sandy',
        title: '/ E-Sports Athlete',
        website: 'sandstromsandymerch.com',
    },
    {
        thumbnailSrc: '/assets/emiway-bantai-records.webp',
        videoSrc: 'null',
        quote: 'Baytix built an app that perfectly matched our vision. Their attention to detail and smooth delivery made the whole experience seamless.',
        author: 'Emiway Bantai',
        title: '/ Founder at Bantai Records',
        website: 'bantai.in',
    },
    {
        thumbnailSrc: '/assets/tamer-compass.webp',
        videoSrc: 'null',
        quote: 'Very professional attitude towards work and a great support staff. Amazing experience from start to finish!',
        author: 'Tamer Huwaidi',
        title: '/ Co-Founder & CEO at CVCA',
        website: 'compass.net',
    },
];

const VideoVouch = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [fadeClass, setFadeClass] = useState('active');

    const { thumbnailSrc, videoSrc, quote, author, title, website } = testimonials[currentIndex];

    const handleChangeIndex = (direction) => {
        setFadeClass(''); // Trigger fade out
        setTimeout(() => {
            setIsPlaying(false);
            setCurrentIndex((prev) => {
                if (direction === 'prev') {
                    return prev === 0 ? testimonials.length - 1 : prev - 1;
                } else {
                    return prev === testimonials.length - 1 ? 0 : prev + 1;
                }
            });
            setFadeClass('active'); // Trigger fade in
        }, 300); // Half of transition duration
    };

    const getYouTubeId = (url) => {
    const regExp = /(?:youtube\.com.*(?:\\?|&)v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
};


    useEffect(() => {
        setFadeClass('active');
    }, [currentIndex]);

    return (
        <div className="vouch-container" id='testimonials'>
            <ProcessHeading
                backgroundText="VOUCHES"
                foregroundText="TESTIMONIALS"
                description='We don’t just build brands — we build relationships.
                Hear from these business owners who trusted Baytix to bring their ideas to life.'
            />
            <div className='vouch-inner-content'>
                <div className='vouch-wrapper'>
                    <div className="vouch-image-section vouch-fade-slide-wrapper">
                        <div className={`vouch-fade-slide ${fadeClass}`}>
                            {isPlaying ? (
    videoSrc.includes('youtube.com') ? (
        <iframe
            src={`https://www.youtube.com/embed/${getYouTubeId(videoSrc)}`}
            title={author}
            className="vouch-video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    ) : (
        <video
            src={videoSrc}
            controls
            autoPlay
            className="vouch-image"
        />
    )
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
                    </div>

                    <div className="vouch-content-section">
                        <div className={`vouch-fade-slide ${fadeClass}`}>
                            <QuoteIcon />
                            <p className="vouch-quote">{quote}</p>
                            <p className="vouch-author">{author} <span className='vouch-title-span'>{title}</span></p>
                            <p className="vouch-website">{website}</p>
                        </div>
                        <div className="vouch-navigation">
                            <button className="nav-arrow left-arrow" onClick={() => handleChangeIndex('prev')}>
                                <ChevronLeftIcon />
                            </button>
                            <div className='nav-arrow-spacer'></div>
                            <button className="nav-arrow right-arrow" onClick={() => handleChangeIndex('next')}>
                                <ChevronRightIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoVouch;
