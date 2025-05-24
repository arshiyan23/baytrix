// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import PromoPopUp from './components/PromoPopUp';
import OfferBanner from './components/OfferBanner';
import FloatingButton from './components/FloatingButton';
import TawkMessenger from './components/TawkMessenger';
import VideoVouch from './components/VideoVouch';
import NumStats from './components/NumStats';
import SupportSection from './components/SupportSection';
import FaqSection from './components/FaqSection';

// Import your two navbars
import NavbarMax from './components/NavbarMax';
import NavbarMin from './components/NavbarMin';

import Home from './pages/Home';
import Branding from './pages/Branding';
import ApplicationDesign from './pages/ApplicationDesign';
import SocialMediaManagement from './pages/SocialMediaManagement';
import MarketingAds from './pages/MarketingAds';
import AiIntegration from './pages/AiIntegration';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import PortfolioItem from './components/PortfolioItem';
import ScrollToTopBtn from './components/ScrollToTopBtn';


// Hook to track window size
function useWindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}


function AppContent() {
  // const location = useLocation();
  // const isHomePage = location.pathname === '/';
  const [showPopup, setShowPopup] = useState(false);

  // Promo pop-up logic
  useEffect(() => {
    const alreadyShown = localStorage.getItem("promoPopupShown");
    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem("promoPopupShown", "true");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Stats data (for Home page)
  // const statsData = [
  //   { id: "clients", icon: "/assets/icon-users.png", value: "0", targetValue: "32+", label: "Clients Served" },
  //   { id: "projects", icon: "/assets/icon-projects.png", value: "0", targetValue: "140+", label: "Projects completed" },
  //   { id: "exp", icon: "/assets/icon-years.png", value: "0", targetValue: "10+", label: "Years of Experience" },
  //   { id: "retention", icon: "/assets/icon-retention.png", value: "0%", targetValue: "100%", label: "Retention Rate" },
  //   { id: "reviewsCount", icon: "/assets/icon-reviews.png", value: "0%", targetValue: "10K+", label: "Reviews Received" },
  // ];

  // Decide which navbar to render based on width
  const width = useWindowSize();
  const isMobile = width < 768;

  return (
    <>
      <PromoPopUp visible={showPopup} onClose={() => setShowPopup(false)} />
      <OfferBanner />

      {/* Switch between Desktop / Mobile Navbar */}
      {isMobile ? <NavbarMin /> : <NavbarMax />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/branding" element={<Branding />} />
        <Route path="/application-design" element={<ApplicationDesign />} />
        <Route path="/social-media-management" element={<SocialMediaManagement />} />
        <Route path="/marketing-ads" element={<MarketingAds />} />
        <Route path="/ai-integration" element={<AiIntegration />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:id" element={<PortfolioItem />} />
      </Routes>

      <TawkMessenger />
      <ScrollToTopBtn />
      <FloatingButton />
      <VideoVouch />

      {/* {isHomePage && (
        <NumStats
          backgroundText="RELIABLE"
          foregroundText="WHY CLIENTS TRUST US"
          statsData={statsData}
        />
      )} */}

      <SupportSection />
      <FaqSection />
      <Footer />
    </>
  );
}


function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
