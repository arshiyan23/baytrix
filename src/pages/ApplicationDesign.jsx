import ProcessHeading from '../components/ProcessHeading';
import ScheduleCall from '../components/ScheduleCall';
import { useEffect, useState, useRef } from 'react';
import HorizontalShowcaseSlider from '../components/HorizontalShowcaseSlider';
import TestimonialSlider from '../components/TestimonialSlider';
import FeatureCarousel from '../components/FeatureCarousel';
import '../styles/application-design.css';



function ApplicationDesign() {
  const [selectedTab, setSelectedTab] = useState(0);
  const stages = [
    {
      title: "Discovery & Strategy",
      desc: "We assess your needs to plan a custom app solution.",
      icon: "/assets/discovery-strategy.png",
    },
    {
      title: "UI/UX Design",
      desc: "Designing intuitive, brand-aligned interfaces.",
      icon: "/assets/ux-ui.png",
    },
    {
      title: "App Development",
      desc: "Building fast, scalable apps with modern tech.",
      icon: "/assets/app-dev-bg-2.png",
    },
    {
      title: "Testing & QA",
      desc: "Thorough testing for a secure, bug-free app.",
      icon: "/assets/qa-test.png",
    },
    {
      title: "Launch & Support",
      desc: "Deploying and maintaining your app long-term.",
      icon: "/assets/launch-supp3.png",
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


  // stats section 
  useEffect(() => {
    const counters = [
      { id: "appsCounter", end: 20, suffix: "+" },
      { id: "usersCounter", end: 1000, suffix: "+" },
      { id: "uptimeCounter", end: 99.9, suffix: "%" },
      { id: "reviewsCounter", end: 10, suffix: "K+" }
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
          const value = end === 99.9
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

  const companies = [
    {
      name: "GoWash",
      description: "Gowash is a modern, mobile-first car washing service built for convenience, quality, and care.",
      images: ["/assets/port1.png", "/assets/port4.png"],
      logo: "/assets/gowash.png"
    },
    {
      name: "Emiway Bantai",
      description: "A self-made Indian rapper without any backing from record labels — a true symbol of independent hustle.",
      images: ["/assets/port1.png", "/assets/port4.png"],
      logo: "/assets/eb.png"
    },

    {
      name: "Compass",
      description: "Turning ideas into real-world impact with strategic guidance, operational support, and hands-on execution.",
      images: ["/assets/port1.png", "/assets/port4.png"],
      logo: "/assets/compass.png"
    }
  ];


  return (
    <>
      <section className="app-intro-section">
        <div className="app-intro-container">
          <img src="/assets/app-dev-bg-2.png" alt="App Intro" className="intro-image" />
          <div className="intro-text">
            <h2>APPLICATION DESIGN</h2>
            <p>
              Why Choose Our App Services? <br/>We combine strategy, design, and cutting-edge tech to deliver apps that
              scale and delight users.
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
        className="intro-wave"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z"
          className="app-curve"
        />
      </svg> */}


      {/* feature section */}
      <FeatureCarousel />

      {/* our app work */}
      <HorizontalShowcaseSlider
        companies={companies}
        headingBackgroundText="SUCCESS"
        headingForegroundText="APPS DEVELOPED"
        foregroundTextColor="white"
      />


      <section className="app-service-section">
        <ProcessHeading
          backgroundText="PROCESS"
          foregroundText="DEVELOPMENT STAGES"
          foregroundTextColor='#7349ac'
          textStrokeOpacity='0.05'
        />
        <h2 className="section-heading"></h2>
        <div className="timeline-container">
          {stages.map((stage, i) => (
            <div
              key={i}
              className={`timeline-item ${i % 2 === 0 ? "top" : "bottom"}`}
            >
              <div className="timeline-content">
                <img src={stage.icon} alt={stage.title} className="stage-icon" />
                <h3>{stage.title}</h3>
                <p>{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="post-launch-section">
        <ProcessHeading
          backgroundText="SUPPORT"
          foregroundText="POST-LAUNCH"
          foregroundTextColor='white'
          backgroundTextFill='#7349ac'
          description='Reliable after-sales support to keep your apps running smoothly and up to date.'
        />
        <div className='post-launch-section-space'></div>
        <div className="post-launch-wrapper">
          <div className="post-launch-buttons">
            {["Hosting", "Support Service", "Monthly Care", "Client Portal"].map((label, index) => (
              <button
                key={index}
                className={`launch-btn ${selectedTab === index ? "active" : ""}`}
                onClick={() => setSelectedTab(index)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="post-launch-content">
            {selectedTab === 0 && (
              <>
                <h3>Managed & Supported</h3>
                <h2>Hosting Solutions</h2>
                <p>
                  We offer comprehensive hosting solutions tailored for websites and applications of all sizes.
                  Built on AWS infrastructure, our hosting delivers fast, secure, and scalable performance — fully managed by our team.
                </p>
                <p>
                  As soon as your product is ready to launch, we handle the deployment, optimize for speed and security,
                  and ensure everything runs smoothly from day one.
                </p>
              </>
            )}
            {selectedTab === 1 && (
              <>
                <h3>Reliable Help When You Need It</h3>
                <h2>Support Service</h2>
                <p>
                  Our expert team is here to help — from quick fixes and updates to ongoing guidance.
                  Whether you need technical support or strategic advice, we’re just a message away.
                </p>
                <p>We provide hands-on support tailored to your needs — whether it’s a quick bug fix, a content update, or integrating a new feature.
                  Our team is available during business hours and often beyond, ensuring your digital product runs smoothly without disruptions.
                  You’ll never be left guessing — we respond quickly, communicate clearly, and resolve issues efficiently.</p>
              </>
            )}
            {selectedTab === 2 && (
              <>
                <h3>Stay Updated and Secure</h3>
                <h2>Monthly Care</h2>
                <p>
                  With our maintenance plans, your site or app stays protected and current.
                  We handle all updates, backups, patches, and performance monitoring — so you can focus on growing your business.
                </p>
                <p>Just like any product, your app or site needs regular attention to stay fast, secure, and compatible with evolving technologies.
                  We proactively handle the behind-the-scenes upkeep so you don’t have to worry about downtime, breaches, or outdated components.
                  It's like having a dedicated technical team watching over your digital product every single month.</p>
              </>
            )}
            {selectedTab === 3 && (
              <>
                <h3>Your Own Admin Portal</h3>
                <h2>Client Portal</h2>
                <p>
                  Get full administrative access through your custom client portal.
                  Easily add or remove content, manage users, review activity logs, and request updates — all from a single, secure dashboard.
                </p>
                <p>
                  The portal gives you more control and transparency, letting you manage your digital product without needing to rely on developer intervention for everyday updates.
                </p>
              </>
            )}
          </div>
        </div>
      </section>


      <section className="success-section">
        <div className="success-wrapper">
          <ProcessHeading 
          backgroundText="NON-STOP" 
          foregroundText="POWERING YOUR GROWTH" 
          backgroundTextFill='#f5f0ff'
          description='We build reliable, scalable digital solutions that help your
            business move faster, reach further, and grow stronger.'
          />
          <div className="success-container">
            <div className="success-item">
              <img src="/assets/icon-apps.png" alt="Apps" className="success-icon" />
              <div className="success-number" id="appsCounter">0</div>
              <p className="success-text">Apps Running</p>
            </div>
            <div className="success-item">
              <img src="/assets/icon-users.png" alt="Users" className="success-icon" />
              <div className="success-number" id="usersCounter">0</div>
              <p className="success-text">Users Served</p>
            </div>
            <div className="success-item">
              <img src="/assets/icon-uptime.png" alt="Uptime" className="success-icon" />
              <div className="success-number" id="uptimeCounter">0%</div>
              <p className="success-text">Uptime Guarantee</p>
            </div>
            <div className="success-item">
              <img src="/assets/icon-reviews.png" alt="Reviews" className="success-icon" />
              <div className="success-number" id="reviewsCounter">0%</div>
              <p className="success-text">Reviews Received</p>
            </div>
          </div>
        </div>
      </section>
      {showScheduleCall && (
        <ScheduleCall onClose={() => setShowScheduleCall(false)} />
      )}
    </>
  );
}

export default ApplicationDesign;
