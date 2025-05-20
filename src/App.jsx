import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ApplicationDesign from './pages/ApplicationDesign';
import Branding from './pages/Branding';
import SocialMediaManagement from './pages/SocialMediaManagement';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PromoPopUp from './components/PromoPopUp';
import OfferBanner from './components/OfferBanner';
import TawkMessenger from './components/TawkMessenger';
import FloatingButton from './components/FloatingButton';
import VideoVouch from './components/VideoVouch';
import NumStats from './components/NumStats';
import SupportSection from './components/SupportSection';
import FaqSection from './components/FaqSection';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // List of valid routes (non-404)
  const validPaths = [
    '/',
    '/application-design',
    '/branding',
    '/social-media-management',
    '/terms',
    '/refund-policy',
    '/privacy-policy',
  ];

  // Check if current path is 404 (not in validPaths)
  const is404 = !validPaths.includes(location.pathname);

  const [showPopup, setShowPopup] = useState(false);

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

  const statsData = [
    {
      id: "clients",
      icon: "/assets/icon-users.png",
      value: "0",
      targetValue: "32+",
      label: "Clients Served",
    },
    {
      id: "projects",
      icon: "/assets/icon-projects.png",
      value: "0",
      targetValue: "140+",
      label: "Projects completed",
    },
    {
      id: "exp",
      icon: "/assets/icon-years.png",
      value: "0",
      targetValue: "10+",
      label: "Years of Experience",
    },
    {
      id: "retention",
      icon: "/assets/icon-retention.png",
      value: "0%",
      targetValue: "100%",
      label: "Retention Rate",
    },
    {
      id: "reviewsCount",
      icon: "/assets/icon-reviews.png",
      value: "0%",
      targetValue: "10K+",
      label: "Reviews Received",
    },
  ];

  return (
    <>
      {!is404 && <PromoPopUp visible={showPopup} onClose={() => setShowPopup(false)} />}
      {!is404 && <OfferBanner />}
      {!is404 && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/application-design" element={<ApplicationDesign />} />
        <Route path="/branding" element={<Branding />} />
        <Route path="/social-media-management" element={<SocialMediaManagement />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!is404 && <TawkMessenger />}
      {!is404 && <FloatingButton />}
      {!is404 && <VideoVouch />}
      {!is404 && isHomePage && (
        <NumStats
          backgroundText="NON-STOP"
          foregroundText="POWERING YOUR GROWTH"
          statsData={statsData}
        />
      )}
      {!is404 && <SupportSection />}
      {!is404 && <FaqSection />}
      {!is404 && <Footer />}
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
