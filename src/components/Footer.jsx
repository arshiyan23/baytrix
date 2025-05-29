import React from 'react';
import '../styles/footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

const Footer = () => {

  const handleSupport = () => {
    if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
      window.Tawk_API.maximize();
    }
  };
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <h4>Services</h4>
            <ul>
              <li><Link to="/branding">Branding</Link></li>
              <li><Link to="/application-design">Application Design</Link></li>
              <li><Link to="/social-media-management">Social Media Management</Link></li>
              <li><Link to="/marketing-ads">Marketing Ads</Link></li>
              {/* <li><Link to="/ai-integration">AI Integration</Link></li> */}
            </ul>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/#services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/#testimonials">Testimonials</Link></li>
            </ul>
          </div>
          {/* <div>
            <h4>Information</h4>
            <ul>
              <li><a href="/">Pricing</a></li>
              <li><a href="/">Case Studies</a></li>
            </ul>
          </div> */}
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="/">About Us</a></li>
              <li><a href="/#better-than-ai">Why Are We Better Than AI?</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              {/* <li><a href="/">Knowledge Base</a></li> */}
              <li><Link to="/contact">Contact Us</Link></li>
              <button className="footer-button" onClick={handleSupport}>
                Report An Issue
              </button>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <a href="/">
            <img src="/assets/baytixlogo-nobg.webp"
              alt="Digital Services Overview" className='footer-logo' />
          </a>
          <div className="footer-legal">
            <span>© 2025 BAYTIX. All rights reserved.</span>
            <div className="footer-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/refund-policy">Refund Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
          <div className="footer-social">
            <a href="https://www.linkedin.com/company/baytixsocial/about/?viewAsMember=true" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.facebook.com/baytix_social" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/baytix_social" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com/Baytix_social" aria-label="X (formerly Twitter)" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 1200 1227">
                <path d="M682.7 556.8 1141.6 0h-104L639.8 445.4 279.3 0H0l491.4 665.8L58.4 1227h104l429.1-495.4L933 1227h279.3z" />
              </svg>
            </a>

            <a href="https://www.youtube.com/@Baytix_Social" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
