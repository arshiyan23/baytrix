// src/components/NavbarMax.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/navbar-max.css';

const servicesPaths = [
  '/branding',
  '/application-design',
  '/social-media-management',
  '/marketing-ads',
  '/ai-integration'
];

const NavbarMax = () => {
  const { pathname } = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // 1) Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setDropdownOpen(false);
    if (pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <header className="max-header">
      <Link to="/">
        <img
          src="/assets/baytixlogo-removebg-preview.png"
          alt="Digital Services Overview"
          className="logo"
        />
      </Link>
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              className={pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>

          <li className="dropdown" ref={dropdownRef}>
            <button
              className={`dropdown-toggle ${isDropdownOpen ? 'open' : ''} ${servicesPaths.includes(pathname) ? 'active' : ''}`}
              onClick={() => setDropdownOpen(o => !o)}
            >
              Services <span className={`arrow ${servicesPaths.includes(pathname) ? 'active' : ''}`} />

            </button>
            <div className={`dropdown-content ${isDropdownOpen ? 'open' : ''}`}>
              {servicesPaths.map(path => (
                <Link
                  key={path}
                  to={path}
                  className={pathname === path ? 'active' : ''}
                  onClick={() => setDropdownOpen(false)} // 👈 close dropdown on click
                >
                  {path.replace('/', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
              ))}
            </div>
          </li>

          <li>
            <Link
              to="/portfolio"
              className={pathname === '/portfolio' ? 'active' : ''}
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link
              to="/#support"
              onClick={(e) => handleNavClick(e, 'support')}
              className={pathname === '/#support' ? 'active' : ''}
            >
              Support
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavbarMax;
