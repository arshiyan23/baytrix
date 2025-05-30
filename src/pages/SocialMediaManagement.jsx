import { useEffect, useState } from "react";
import "../styles/social-media-management.css";
import ProcessHeading from "../components/ProcessHeading";
import VerticalShowcaseSlider from "../components/VerticalShowcaseSlider";
import ScheduleCall from "../components/ScheduleCall";
import FloatingIcons from "../components/FloatingIcons";

function SocialMediaManagement() {
  // data for verticalshowcaseslider
  const postFeatures = [
    {
      title: "Best Designs",
      description: "Every post is crafted with on-brand colors, modern typography, and visual hierarchy to stand out in crowded feeds.",
      image: "/assets/portfolio/sm-posts/insta-post1.webp",
      icon: "/assets/better-design.webp"
    },
    {
      title: "Best Quality",
      description: "We use high-resolution visuals optimized for each platform, ensuring posts look sharp on all screen sizes.",
      image: "/assets/portfolio/sm-posts/insta-post2.webp",
      icon: "/assets/better-image.webp"
    },
    {
      title: "Reels Thumbnails",
      description: "We design eye-catching covers for Instagram Reels and TikToks to maximize clicks and brand consistency.",
      video: "/assets/portfolio/sm-posts/insta-post3.mp4",
      icon: "/assets/reel-thumbnails.webp"
    },
    {
      title: "Interactive Stories",
      description: "We design story posts that encourage engagement through polls, questions, sliders, and more.",
      image: "/assets/portfolio/sm-posts/insta-post3.webp",
      icon: "/assets/stories.webp"
    },
    {
      title: "Infographics",
      description: "We break down complex data into clean, digestible visuals for educational or promotional purposes.",
      image: "/assets/portfolio/sm-posts/insta-post1.webp",
      icon: "/assets/infographics.webp"
    },
    {
      title: "Branded Announcements",
      description: "From product launches to event updates, we design announcement posts that feel native to your brand.",
      image: "/assets/portfolio/sm-posts/insta-post4.webp",
      icon: "/assets/announcement.webp"
    },
  ];


  //schedule a meeting section
  const [showScheduleCall, setShowScheduleCall] = useState(false);

  // hex card effect
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

  // stats effect
  // useEffect(() => {
  //   const counters = [
  //     { id: "impressionsCounter", end: 120, suffix: "K+" },
  //     { id: "engagementCounter", end: 11.2, suffix: "%" },
  //     { id: "reachCounter", end: 30, suffix: "K+" },
  //   ];

  //   counters.forEach(({ id, end, suffix }) => {
  //     const el = document.getElementById(id);
  //     const parent = el?.closest(".success-item");
  //     if (!el || !parent) return;

  //     const animate = () => {
  //       const duration = 1000;
  //       const startTime = performance.now();

  //       const update = (currentTime) => {
  //         const progress = Math.min((currentTime - startTime) / duration, 1);
  //         const value = typeof end === "number" && end % 1 !== 0
  //           ? (progress * end).toFixed(1)
  //           : Math.floor(progress * end);
  //         el.textContent = `${value}${suffix}`;
  //         if (progress < 1) requestAnimationFrame(update);
  //       };

  //       requestAnimationFrame(update);
  //     };

  //     const observer = new IntersectionObserver(
  //       ([entry]) => {
  //         if (entry.isIntersecting) {
  //           parent.classList.add("visible");
  //           animate();
  //           observer.disconnect();
  //         }
  //       },
  //       { threshold: 0.5 }
  //     );

  //     observer.observe(parent);
  //   });
  // }, []);


  // timeline effect
  useEffect(() => {
    const items = document.querySelectorAll(".fade-in-right");
    if (!items.length) {
      console.warn("No .fade-in-right items found");
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);


  return (
    <>
      <section className="smm-hero-section">
        <FloatingIcons category="socialMediaManagement" />
        <div className="smm-hero-content">
          <img src="/assets/smm-hero2.webp" alt="Social Media" className="smm-hero-img" />
          <div className="smm-hero-text">
            <h2>SOCIAL MEDIA MANAGEMENT</h2>
            <p>
              From strategy to content to growth — we manage your presence across platforms so you can focus on your business.
            </p>
            <button
              className="cta-button"
              onClick={() => setShowScheduleCall(true)}
            >
              BOOK A FREE CONSULTATION
            </button>
          </div>
        </div>
      </section>

      {/* <svg
        className="smm-wave"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z"
          className="smm-curve"
        />
      </svg> */}

      <section className="digital-solutions-section">
        <ProcessHeading
          backgroundText="SERVIVES"
          foregroundText="DIGITAL GROWTH"
          description="We manage your brand across platforms like
          Instagram, Facebook, WhatsApp, and more—crafting content,
          scheduling posts, and keeping your audience engaged"
        />
        <p> </p>
        <div className="honeycomb-grid">
          {[
            {
              title: "Instagram",
              desc: "Branded posts & visual storytelling",
              icon: "/assets/instagram-ico.webp",
            },
            {
              title: "Google MB",
              desc: "Timely updates to boost local presence",
              icon: "/assets/google-ads-ico2.webp",
            },
            {
              title: "Facebook",
              desc: "Engaging content to grow your page",
              icon: "/assets/facebook-ico.webp",
            },
            {
              title: "WhatsApp",
              desc: "Custom messages & broadcast designs",
              icon: "/assets/whatsapp-buss-ico2.webp",
            },
            {
              title: "TikTok",
              desc: "Creative ideas for viral short videos",
              icon: "/assets/tiktok-ico.webp",
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
        headingBackgroundText="CONTENT"
        headingForegroundText="PUBLISHED FOR BRANDS"
        slideShowData={postFeatures}
      />

      <section className="smm-timeline-section">
        <ProcessHeading backgroundText="TIMELINE" foregroundText="OUR PROCEDURE" />
        <div className="smm-timeline">
          {[
            {
              title: "Content Planning",
              desc: "Strategize content calendars aligned with your goals.",
              icon: "/assets/strategize-ico.webp",
            },
            {
              title: "Post Design",
              desc: "Eye-catching, on-brand post visuals.",
              icon: "/assets/post-design.webp",
            },
            {
              title: "Performance Analytics",
              desc: "Track engagement and optimize results.",
              icon: "/assets/growth-ico.webp",
            },
            {
              title: "Hashtag Strategy",
              desc: "Use trending hashtags to boost reach.",
              icon: "/assets/hashtag-ico.webp",
            },
            {
              title: "Ad Management",
              desc: "Run and track conversion-focused ads.",
              icon: "/assets/ads-ico.webp",
            },
            {
              title: "Account Growth",
              desc: "Grow followers through smart targeting.",
              icon: "/assets/followers-ico.webp",
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

      {/* <section className="social-success-section">
        <div className="success-wrapper">
          <ProcessHeading
            backgroundText="REACH METRICS"
            foregroundText="SOCIAL MEDIA PERFORMANCE"
            backgroundTextFill="#f5f0ff"
            description="Our social campaigns are designed to increase visibility, boost interaction, and build strong audience connections."
          />
          <p className="success-desc-txt">

          </p>
          <div className="success-container">
            <div className="success-item">
              <img src="/assets/impressions-ico.webp" alt="Impressions" className="success-icon" />
              <div className="success-number" id="impressionsCounter">0</div>
              <p className="success-text">Total Impressions</p>
            </div>
            <div className="success-item">
              <img src="/assets/engagements-ico.webp" alt="Engagement" className="success-icon" />
              <div className="success-number" id="engagementCounter">0%</div>
              <p className="success-text">Avg. Engagement Rate</p>
            </div>
            <div className="success-item">
              <img src="/assets/reach-ico.webp" alt="Reach" className="success-icon" />
              <div className="success-number" id="reachCounter">0</div>
              <p className="success-text">Accounts Reached</p>
            </div>
          </div>
        </div>
      </section> */}

      {showScheduleCall && (
        <ScheduleCall onClose={() => setShowScheduleCall(false)} />
      )}
    </>
  );
}

export default SocialMediaManagement;
