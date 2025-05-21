import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import ScheduleCall from '../components/ScheduleCall';
import LogoSlider from '../components/LogoSlider';
import GalleryScroller from '../components/GalleryScroller';
import ProcessHeading from '../components/ProcessHeading';

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
    } else {
      // Scroll to top only if there's no hash
      window.scrollTo({ top: 0, behavior: 'auto' });
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
            {/* <h1>Personalized Digital Business Solutions</h1> */}
            <h1>PERSONALIZED DIGITAL BUSINESS SOLUTIONS</h1>
            <p>
              Everything you need to digitally grow any business
              <br />—all in one place.
            </p>
            <button
              className="cta-button"
              onClick={() => setShowScheduleCall(true)}
            >
              BOOK A FREE CONSULTATION
            </button>
          </div>

          <div className="hero-image">
            <img src="/assets/bg3.png" alt="Digital Services Overview" />
          </div>

          {/* <p className="hero-bottom-text">TRUSTED BY TOP BRANDS</p> */}

        </div>
      </section>


      <LogoSlider />


      <section id="services" className="services">
        <ProcessHeading
        foregroundText='OUR SERVICES'
        backgroundText='EXPERTISE' 
        description='We empower businesses with innovative digital strategies that build strong identities, boost engagement, and drive measurable growth across platforms.
'
        />
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
            link="marketing-ads"
          />
          <ServiceCard
            imgSrc="/assets/ai_automation.png"
            title="AI Integration"
            desc="Automate tasks using AI for faster, smarter business operations."
            link="ai-integration"
          />
        </div>
      </section>

      {/* <section id="portfolio" className="portfolio">
        <Portfolio />
      </section> */}

      {/* gallery scroller section */}
      <GalleryScroller />


      {showScheduleCall && (
        <ScheduleCall onClose={() => setShowScheduleCall(false)} />
      )}
    </>
  );
};
export default Home;
