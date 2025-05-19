import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const handleNavClick = (e, id) => {
    e.preventDefault();

    if (location.pathname === '/') {
      // Already on homepage – scroll smoothly
      const element = document.getElementById(id);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    } else {
      // Navigate to homepage with hash
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
          <li>
            <Link to="/#home" onClick={(e) => handleNavClick(e, 'home')}>Home</Link>
          </li>
          <li>
            <Link to="/#services" onClick={(e) => handleNavClick(e, 'services')}>Services</Link>
          </li>
          <li>
            <Link to="/#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')}>Portfolio</Link>
          </li>
          <li>
            <Link to="/#support" onClick={(e) => handleNavClick(e, 'support')}>Support</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
