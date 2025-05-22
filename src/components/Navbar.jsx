import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setDropdownOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <header>
      <Link to="/">
        <img
          src="/assets/baytixlogo-removebg-preview.png"
          alt="Digital Services Overview"
          className="logo"
        />
      </Link>
      <nav>
        <ul id="nav-links">
          <li><Link to="/">Home</Link></li>

          <li className="dropdown" ref={dropdownRef}>
            <button
              className={`dropdown-toggle ${isDropdownOpen ? 'open' : ''}`}
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              Services <span className="arrow" />
            </button>
            <div className={`dropdown-content ${isDropdownOpen ? 'open' : ''}`}>
              <Link to="/branding">Branding</Link>
              <Link to="/application-design">Application Design</Link>
              <Link to="/social-media-management">Social Media Management</Link>
              <Link to="/marketing-ads">Marketing & Ads</Link>
              <Link to="/ai-integration">AI Integration</Link>
            </div>
          </li>

          <li><Link to="/portfolio">Portfolio</Link></li>
          <li>
            <Link to="/#support" onClick={(e) => handleNavClick(e, 'support')}>
              Support
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
