import { useEffect, useState } from "react";
import "../styles/social-media-management.css";
import ProcessHeading from "../components/ProcessHeading";
import VerticalShowcaseSlider from "../components/VerticalShowcaseSlider";
import TestimonialSlider from "../components/TestimonialSlider";
import ScheduleCall from "../components/ScheduleCall";

function SocialMediaManagement() {
  useEffect(() => {
    const cards = document.querySelectorAll(".smm-feature, .hex-card");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("smm-animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();

  }, []);
  useEffect(() => {
    const counters = [
      { id: "impressionsCounter", end: 120, suffix: "K+" },
      { id: "engagementCounter", end: 11.2, suffix: "%" },
      { id: "reachCounter", end: 30, suffix: "K+" },
    ];

    counters.forEach(({ id, end, suffix }) => {
      const el = document.getElementById(id);
      const parent = el?.closest(".success-item");
      if (!el || !parent) return;

      const animate = () => {
        const duration = 1000;
        const startTime = performance.now();

        const update = (currentTime) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const value = typeof end === "number" && end % 1 !== 0
            ? (progress * end).toFixed(1)
            : Math.floor(progress * end);
          el.textContent = `${value}${suffix}`;
          if (progress < 1) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            parent.classList.add("visible");
            animate();
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(parent);
    });
  }, []);

  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImageIndex(prev => (prev + 1) % 3);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  const companies = [
    {
      name: "GoWash",
      description: "Gowash is a modern, mobile-first car washing service built for convenience, quality, and care.",
      images: ["/assets/insta-post1.png", "/assets/insta-post2.png", "/assets/insta-post3.png"],
      logo: "/assets/gowash.png"
    },
    {
      name: "Emiway Bantai",
      description: "A self-made Indian rapper without any backing from record labels — a true symbol of independent hustle.",
      images: ["/assets/insta-post1.png", "/assets/insta-post2.png", "/assets/insta-post3.png"],
      logo: "/assets/eb.png"
    },
    {
      name: "Compass",
      description: "Turning ideas into real-world impact with strategic guidance, operational support, and hands-on execution.",
      images: ["/assets/insta-post1.png", "/assets/insta-post2.png", "/assets/insta-post3.png"],
      logo: "/assets/compass.png"
    }
  ];

  const testimonialsData = [
    {
      image: "/assets/emiway-bantai-records.png",
      name: "Emiway Bantai",
      role: "(Founder, Bantai Records)",
      description: "The service was excellent and truly exceeded expectations.",
    },
    {
      image: "/assets/sehaj-gowash.png",
      name: "Sehajpal Singh",
      role: "(Founder & CEO, GoWash)",
      description: "Amazing experience from start to finish!",
    },
    {
      image: "/assets/tamer-compass.png",
      name: "Tamer Huwaidi",
      role: "(Co-Founder, Compass)",
      description: "Highly recommend them to anyone seeking quality.",
    },
  ];

  //schedule a meeting section
  const [showScheduleCall, setShowScheduleCall] = useState(false);
  useEffect(() => {
    const items = document.querySelectorAll(".timeline-item");

    const timelineObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            timelineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    items.forEach(item => timelineObserver.observe(item));
    return () => timelineObserver.disconnect();
  }, []);


  return (
    <>
      <section className="smm-hero-section">
        <div className="smm-hero-content">
          <img src="/assets/smm-hero2.png" alt="Social Media" className="smm-hero-img" />
          <div className="smm-hero-text">
            <h2>Master Social Media, Amplify Your Brand</h2>
            <p>
              From strategy to content to growth — we manage your presence across platforms so you can focus on your business.
            </p>
            <button
              className="cta-button"
              onClick={() => setShowScheduleCall(true)}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      <svg
        className="smm-wave"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z"
          className="smm-curve"
        />
      </svg>

      <section className="digital-solutions-section">
        <ProcessHeading
          backgroundText="SERVIVES"
          foregroundText="DIGITAL GROWTH"
        />
        <p>We manage your brand across platforms like
          Instagram, Facebook, WhatsApp, and more—crafting content, <br />
          scheduling posts, and keeping your audience engaged </p>
        <div className="honeycomb-grid">
          {[
            {
              title: "Instagram",
              desc: "Branded posts & visual storytelling",
              icon: "/assets/instagram-ico.png",
            },
            {
              title: "Google MB",
              desc: "Timely updates to boost local presence",
              icon: "/assets/google-ads-ico2.png",
            },
            {
              title: "Facebook",
              desc: "Engaging content to grow your page",
              icon: "/assets/facebook-ico.png",
            },
            {
              title: "WhatsApp",
              desc: "Custom messages & broadcast designs",
              icon: "/assets/whatsapp-buss-ico2.png",
            },
            {
              title: "TikTok",
              desc: "Creative ideas for viral short videos",
              icon: "/assets/tiktok-ico.png",
            },

          ].map((service, i) => (
            <div className="hex-card" key={i}>
              <div className="hex-content">
                <img src={service.icon} alt={service.title} />
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* our posts for brands section */}
      <VerticalShowcaseSlider
        companies={companies}
        headingBackgroundText="CONTENT"
        headingForegroundText="PUBLISHED FOR BRANDS"
      />

      <section className="smm-timeline-section">
        <ProcessHeading backgroundText="TIMELINE" foregroundText="OUR PROCEDURE" />
        <div className="smm-timeline">
          {[
            {
              title: "Content Planning",
              desc: "Strategize content calendars aligned with your goals.",
              icon: "/assets/strategize-ico.png",
            },
            {
              title: "Post Design",
              desc: "Eye-catching, on-brand post visuals.",
              icon: "/assets/post-design.png",
            },
            {
              title: "Performance Analytics",
              desc: "Track engagement and optimize results.",
              icon: "/assets/growth-ico.png",
            },
            {
              title: "Hashtag Strategy",
              desc: "Use trending hashtags to boost reach.",
              icon: "/assets/hashtag-ico.png",
            },
            {
              title: "Ad Management",
              desc: "Run and track conversion-focused ads.",
              icon: "/assets/ads-ico.png",
            },
            {
              title: "Account Growth",
              desc: "Grow followers through smart targeting.",
              icon: "/assets/followers-ico.png",
            },
          ].map((item, i) => (
            <div className="smm-timeline-step fade-in-right" key={i}>
              <div className="smm-timeline-icon">
                <div className="smm-timeline-circle">
                  <img src={item.icon} alt={item.title} />
                </div>
                <span className="smm-step-number">Step {i + 1}</span>
              </div>
              <div className="smm-timeline-content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="social-success-section">
        <div className="success-wrapper">
          <ProcessHeading
            backgroundText="REACH METRICS"
            foregroundText="SOCIAL MEDIA PERFORMANCE"
          />
          <p className="success-desc-txt">
            Our social campaigns are designed to increase visibility, boost interaction, and build strong audience connections.
          </p>
          <div className="success-container">
            <div className="success-item">
              <img src="/assets/impressions-ico.png" alt="Impressions" className="success-icon" />
              <div className="success-number" id="impressionsCounter">0</div>
              <p className="success-text">Total Impressions</p>
            </div>
            <div className="success-item">
              <img src="/assets/engagements-ico.png" alt="Engagement" className="success-icon" />
              <div className="success-number" id="engagementCounter">0%</div>
              <p className="success-text">Avg. Engagement Rate</p>
            </div>
            <div className="success-item">
              <img src="/assets/reach-ico.png" alt="Reach" className="success-icon" />
              <div className="success-number" id="reachCounter">0</div>
              <p className="success-text">Accounts Reached</p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialSlider
        testimonials={testimonialsData}
        headingBackgroundText="SATISFIED"
        headingForegroundText="TESTIMONIALS"
        foregroundTextColor='white'
      />

      {showScheduleCall && (
        <ScheduleCall onClose={() => setShowScheduleCall(false)} />
      )}
    </>
  );
}

export default SocialMediaManagement;
