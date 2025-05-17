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
      <a href="/">
        <img src="/assets/baytixlogo-removebg-preview.png" 
        alt="Digital Services Overview" className='logo' />
      </a>
      {/* <a href="/" className="logo"></a> */}
      <nav>
        <ul id="nav-links">
          <li><a href="/#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
          <li><a href="/#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a></li>
          <li><a href="/#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')}>Portfolio</a></li>
          {/* <li><a href="/#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
