import React from 'react';
import '../styles/footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <h4>Services</h4>
            <ul>
              <li><a href='/branding'>Branding</a></li>
              <li><a href='/application-design'>Application Design</a></li>
              <li><a href='/social-media-management'>Social Media Management</a></li>
              <li><a href='/'>Marketing Ads</a></li>
              <li><a href='/'>AI Integration</a></li>
            </ul>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/#home">Home</a></li>
              <li><a href="/#services">Services</a></li>
              <li><a href="/#portfolio">Portfolio</a></li>
              <li><a href="/#reviews">Reviews</a></li>
            </ul>
          </div>
          {/* <div>
            <h4>Tools</h4>
            <ul>
              <li><a href="#">Website Builder</a></li>
              <li><a href="#">AI Logo Generator</a></li>
              <li><a href="#">Business Name Generator</a></li>
              <li><a href="#">Hostinger API</a></li>
            </ul>
          </div> */}
          <div>
            <h4>Information</h4>
            <ul>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Technology</a></li>
              <li><a href="#">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="#">Knowledge Base</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Report An Issue</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <a href="/">
        <img src="/assets/baytixlogo-removebg-preview.png" 
        alt="Digital Services Overview" className='logo' />
      </a>
          <div className="footer-legal">
            <span>© 2025 BAYTIX. All rights reserved.</span>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Refund Policy</a>
              <a href="#">Terms of Service</a>
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
            <a href="https://twitter.com/Baytix_social" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.youtube.com/channel/Baytix_social" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
