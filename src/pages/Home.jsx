import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import ScheduleCall from '../components/ScheduleCall';
import LogoSlider from '../components/LogoSlider';
import GalleryScroller from '../components/GalleryScroller';
import ProcessHeading from '../components/ProcessHeading';
import FloatingBlobs from '../components/FloatingBlobs';
import FloatingIcons from '../components/FloatingIcons';
import CardSlider from '../components/CardSlider';

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
  

  return (
    <>
      <section id="home" className="hero">
        {/* <FloatingBlobs /> */}
        <FloatingIcons category="homeScreen" />
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
            <img src="/assets/home-hero.webp" alt="Digital Services Overview" />
          </div>

          {/* <p className="hero-bottom-text">TRUSTED BY TOP BRANDS</p> */}

        </div>
      </section>


      <LogoSlider />

      {/* <section id="services" className="services">
        <ProcessHeading
        foregroundText='OUR SERVICES'
        backgroundText='EXPERTISE' 
        description='We empower businesses with innovative digital strategies that build strong identities, boost engagement, and drive measurable growth across platforms.'
        />
        <div className="service-container">
          <ServiceCard
            imgSrc="/assets/branding.webp"
            title="Branding"
            desc="Build a strong Brand identity through graphical content"
            link="/branding"
          />
          <ServiceCard
            imgSrc="/assets/application_design2.webp"
            title="Application Design"
            desc="Mobile apps, web apps, websites, and full-stack digital platforms"
            link="/application-design"
          />
          <ServiceCard
            imgSrc="/assets/smm.webp"
            title="Social Media Management"
            desc="Grow your audience across social media platforms."
            link='social-media-management'
          />
          <ServiceCard
            imgSrc="/assets/marketing.webp"
            title="Marketing Ads"
            desc="SEO to boost brand visibility, along with content, and PPC strategies."
            link="marketing-ads"
          />
          <ServiceCard
            imgSrc="/assets/ai_automation.webp"
            title="AI Integration"
            desc="Automate tasks using AI for faster, smarter business operations."
            link="ai-integration"
          />
        </div>
      </section> */}

      <CardSlider />

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
