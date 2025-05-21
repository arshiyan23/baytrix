import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/feature-carousel.css";
import ProcessHeading from "./ProcessHeading";

// Sample feature data with stats and icons for each app type
const featureList = [
  {
    title: "Mobile Apps",
    desc: "We design and develop high-performance iOS and Android mobile applications tailored to your business needs.",
    image: "/assets/port1.png",
    stats: {
      running: "20+",
      users: "500K+",
      countries: "30+",
      launched: "50+",
    },
    icons: {
      running: "/assets/apps-ico.png",
      users: "/assets/users.png",
      countries: "/assets/countries.png",
      launched: "/assets/launched.png",
    },
  },
  {
    title: "Webapps",
    desc: "Our team builds robust, scalable browser-based applications including dashboards, SaaS platforms, and enterprise tools.",
    image: "/assets/port4.png",
    stats: {
      running: "30+",
      users: "1M+",
      countries: "40+",
      launched: "75+",
    },
    icons: {
      running: "/assets/running.png",
      users: "/assets/users.png",
      countries: "/assets/countries.png",
      launched: "/assets/launched.png",
    },
  },
  {
    title: "Websites",
    desc: "We craft responsive, SEO-optimized websites that elevate your online presence.",
    image: "/assets/port1.png",
    stats: {
      running: "100+",
      users: "2M+",
      countries: "50+",
      launched: "200+",
    },
    icons: {
      running: "/assets/running.png",
      users: "/assets/users.png",
      countries: "/assets/countries.png",
      launched: "/assets/launched.png",
    },
  },
  {
    title: "App Integration",
    desc: "Maximize productivity with seamless integrations for tools like Zoho, Office 365, Slack, and more.",
    image: "/assets/port4.png",
    stats: {
      running: "40+",
      users: "1.5M+",
      countries: "45+",
      launched: "100+",
    },
    icons: {
      running: "/assets/running.png",
      users: "/assets/users.png",
      countries: "/assets/countries.png",
      launched: "/assets/launched.png",
    },
  },
];

export default function FeatureCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [activeStats, setActiveStats] = useState(featureList[0].stats);

  const nextSlide = () => {
    setDirection("right");
    setActiveIndex((prev) => (prev + 1) % featureList.length);
  };

  const prevSlide = () => {
    setDirection("left");
    setActiveIndex((prev) =>
      prev === 0 ? featureList.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Automatically change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setActiveStats(featureList[activeIndex].stats);
  }, [activeIndex]);

  return (
    <section className="carousel-section">
      <div className="carousel-header">
        <ProcessHeading 
        backgroundText="OUR APPS" 
        foregroundText="WHAT WE OFFER"
        description="Tailored digital solutions for real-world business growth."
        backgroundTextFill="#f5f0ff"
        />
      </div>

      {/* New wrapper for layout */}
      <div className="carousel-content-wrapper">
        {/* Left: Carousel */}
        <div className="carousel-left">
          <div className="carousel-wrapper">
            <button onClick={prevSlide} className="feature-carousel-arrow left">
              &#8592;
            </button>
            <div className={`carousel-slide-container ${direction}`}>
              <div
                className="carousel-slide"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {featureList.map((item, i) => (
                  <div
                    className="feature-card"
                    key={i}
                    onClick={() => setActiveIndex(i)}
                  >
                    <img src={item.image} alt={item.title} />
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={nextSlide} className="feature-carousel-arrow right">
              &#8594;
            </button>
          </div>

          <div className="carousel-dots">
            {featureList.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === activeIndex ? "active" : ""}`}
                onClick={() => {
                  setDirection(i > activeIndex ? "right" : "left");
                  setActiveIndex(i);
                }}
              ></span>
            ))}
          </div>
        </div>

        {/* Right: Stats */}
        <div className="carousel-right">
          <motion.div
            className="stats-box"
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Milestones Achieved</h2>
            {/* <p className="stats-subtitle">For {featureList[activeIndex].title}</p> */}
            <div className="stats">
              <div className="stat">
                <img
                  src={featureList[activeIndex].icons.running}
                  alt="Running Apps"
                  className="stat-icon"
                />
                <p>Running Apps</p>
                <strong>{activeStats.running}</strong>
              </div>
              <div className="stat">
                <img
                  src={featureList[activeIndex].icons.users}
                  alt="Users"
                  className="stat-icon"
                />
                <p>Users</p>
                <strong>{activeStats.users}</strong>
              </div>
              <div className="stat">
                <img
                  src={featureList[activeIndex].icons.countries}
                  alt="Countries"
                  className="stat-icon"
                />
                <p>Countries</p>
                <strong>{activeStats.countries}</strong>
              </div>
              <div className="stat">
                <img
                  src={featureList[activeIndex].icons.launched}
                  alt="Launched"
                  className="stat-icon"
                />
                <p>Launched</p>
                <strong>{activeStats.launched}</strong>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
