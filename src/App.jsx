import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

// Put useLocation inside a child component rendered within Router
function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <OfferBanner />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/application-design" element={<ApplicationDesign />} />
        <Route path="/branding" element={<Branding />} />
        <Route path="/social-media-management" element={<SocialMediaManagement />} />
      </Routes>
      <TawkMessenger />
      <FloatingButton />
      {isHomePage && <PieStats />}
      {/* Show PieStats only on Home page */}
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
