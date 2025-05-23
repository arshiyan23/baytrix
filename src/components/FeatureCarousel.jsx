import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/feature-carousel.css";
import ProcessHeading from "./ProcessHeading";

const featureList = [
    {
    title: "Websites",
    desc: "We craft responsive, SEO-optimized websites that elevate your online presence.",
    image: "/assets/website_app.png",
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
    title: "Desktop Applications",
    desc: "We create cross-platform desktop software with sleek UI and powerful performance for Windows, macOS, and Linux.",
    image: "/assets/desktop_app.png",
    stats: {
      running: "15+",
      users: "300K+",
      countries: "25+",
      launched: "35+",
    },
    icons: {
      running: "/assets/running.png",
      users: "/assets/users.png",
      countries: "/assets/countries.png",
      launched: "/assets/launched.png",
    },
  },
  {
    title: "Mobile Applications",
    desc: "We design and develop high-performance iOS and Android mobile applications tailored to your business needs.",
    image: "/assets/mobile_apps.png",
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
    title: "Web Applications",
    desc: "Our team builds robust, scalable browser-based applications including dashboards, SaaS platforms, and enterprise tools.",
    image: "/assets/web_apps.png",
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
    title: "App Integration",
    desc: "Maximize productivity with seamless integrations for tools like Zoho, Office 365, Slack, and more.",
    image: "/assets/app_integration.png",
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
          description="We build personalized applications that streamline operations,
        enhance user experience, and maximize your ROI—tailored to your specific needs."
          backgroundTextFill="#f5f0ff"
        />
      </div>

      {/* New wrapper for layout */}
      <div className="carousel-content-wrapper">
        {/* Left: Title + Description */}
        <div className="carousel-text">
          <h3 className="carousel-title">{featureList[activeIndex].title}</h3>
          <p className="carousel-description">{featureList[activeIndex].desc}</p>
        </div>

        {/* Right: Carousel */}
        <div className="carousel-right">
          <motion.div
            className="carousel-slide-container"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              if (info.offset.x < -50) nextSlide();
              else if (info.offset.x > 50) prevSlide();
            }}
          >
            <div
              className="carousel-slide"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {featureList.map((item, i) => (
                <div className="feature-card" key={i}>
                  {/* inside your carousel slide */}
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable="false"
                    onDragStart={(e) => e.preventDefault()}
                  />

                </div>
              ))}
            </div>
          </motion.div>

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
      </div>

    </section>
  );
}
