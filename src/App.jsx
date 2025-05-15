import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ApplicationDesign from './pages/ApplicationDesign';
import ContactUs from './components/ContactUs';
import ScrollToTop from './components/ScrollToTop';
import Branding from './pages/Branding';
import SocialMediaManagement from './pages/SocialMediaManagement';
import FloatingButton from './components/FloatingButton';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/application-design" element={<ApplicationDesign />} />
        <Route path="/branding" element={<Branding />} />
        <Route path="/social-media-management" element={<SocialMediaManagement />} />
      </Routes>
      <FloatingButton />
      <ContactUs />
      <Footer />
    </Router>
  );
}

export default App;
