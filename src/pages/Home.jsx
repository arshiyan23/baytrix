import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import Portfolio from '../components/Portfolio';
import ScheduleCall from '../components/ScheduleCall';
import TestimonialSlider from '../components/TestimonialSlider';

const Home = () => {
  const location = useLocation();
  const [showScheduleCall, setShowScheduleCall] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const offsetTop = element.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

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

  return (
    <>
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Personalized Digital Business Solutions</h1>
            <p>Empowering your business with cutting-edge technology</p>
            <button
              className="cta-button"
              onClick={() => setShowScheduleCall(true)}
            >
              Get Started
            </button>
          </div>

          <div className="hero-image">
            <img src="/assets/bg3.png" alt="Digital Services Overview" />
          </div>
        </div>

        <svg className="hero-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
          <path className="curve" d="M0,160 C480,240 960,80 1440,160 L1440,320 L0,320 Z" />
        </svg>
      </section>

      <section id="services" className="services">
        <h2>Our Services</h2>
        <div className="service-container">
          <ServiceCard
            imgSrc="/assets/branding.png"
            title="Branding"
            desc="Build a strong Brand identity through graphical content"
            link="/branding"
          />
          <ServiceCard
            imgSrc="/assets/application_design2.png"
            title="Application Design"
            desc="Mobile apps, web apps, websites, and full-stack digital platforms"
            link="/application-design"
          />
          <ServiceCard
            imgSrc="/assets/smm.png"
            title="Social Media Management"
            desc="Grow your audience across social media platforms."
            link='social-media-management'
          />
          <ServiceCard
            imgSrc="/assets/marketing.png"
            title="Marketing Ads"
            desc="SEO to boost brand visibility, along with content, and PPC strategies."
            link="marketing-campaigns"
          />
          <ServiceCard
            imgSrc="/assets/ai_automation.png"
            title="AI Automation"
            desc="Automate tasks using AI for faster, smarter business operations."
            link="ai-automation"
          />
        </div>
      </section>

      <section id="portfolio" className="portfolio">
        <Portfolio />
      </section>

      <section className="brands">
        <h2>Our Trusted Partners</h2>
        <div className="brands-scroll-container">
          <div className="brands-scroll-content">
            <img src="/assets/eb.png" />
            <img src="/assets/gowash.png" />
            <img src="/assets/compass-logo.png" />
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
};
export default Home;
