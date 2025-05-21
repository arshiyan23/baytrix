import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ApplicationDesign from './pages/ApplicationDesign';
import ContactUs from './components/ContactUs';
import ScrollToTop from './components/ScrollToTop';
import Branding from './pages/Branding';
import SocialMediaManagement from './pages/SocialMediaManagement';
import FloatingButton from './components/FloatingButton';
import OfferBanner from './components/OfferBanner';
import FaqSection from './components/FaqSection';
import PieStats from './components/PieStats';
import SupportSection from './components/SupportSection';
import TawkMessenger from './components/TawkMessenger';
import NumStats from './components/NumStats';
import PromoPopUp from './components/PromoPopUp';
import TermsAndConditions from './pages/TermsAndConditions';
import VideoVouch from './components/VideoVouch';
import RefundPolicy from './pages/RefundPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Put useLocation inside a child component rendered within Router
function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [showPopup, setShowPopup] = useState(false);

  //logic for promo pop up 
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
      <PromoPopUp visible={showPopup} onClose={() => setShowPopup(false)} />
      <OfferBanner />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/application-design" element={<ApplicationDesign />} />
        <Route path="/branding" element={<Branding />} />
        <Route path="/social-media-management" element={<SocialMediaManagement />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <TawkMessenger />
      <FloatingButton />
      <VideoVouch />
      {isHomePage &&
        <NumStats
          backgroundText="CREDIBILITY"
          foregroundText="WHY CLIENTS TRUST US"
          statsData={statsData}
        />}
      {/* Show NumStats only on Home page */}
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
