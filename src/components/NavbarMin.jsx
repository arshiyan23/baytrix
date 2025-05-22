// src/components/NavbarMin.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/navbar-min.css';

const servicesPaths = [
  '/branding',
  '/application-design',
  '/social-media-management',
  '/marketing-ads',
  '/ai-integration'
];

const NavbarMin = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hamburgerRolling, setHamburgerRolling] = useState(false);
  const [closeRolling, setCloseRolling] = useState(false);
  const menuRef = useRef();

  // only bind outside‐click when menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        triggerClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const triggerOpen = () => {
    setHamburgerRolling(true);
    setMenuOpen(true);
  };
  const onHamburgerAnimEnd = () => setHamburgerRolling(false);

  const triggerClose = () => {
    setCloseRolling(true);
    setMenuOpen(false);
    setDropdownOpen(false);
  };
  const onCloseAnimEnd = () => setCloseRolling(false);

  return (
    <header className="min-header">
      <Link to="/">
        <img
          src="/assets/baytixlogo-removebg-preview.png"
          alt="Logo"
          className="min-logo"
        />
      </Link>

      {/* Hamburger (always in DOM) */}
      <button
        className={`min-hamburger ${menuOpen ? 'hidden' : ''} ${hamburgerRolling ? 'rolling' : ''}`}
        onClick={triggerOpen}
        onAnimationEnd={onHamburgerAnimEnd}
        aria-label="Open menu"
      >
        <img src="/assets/hamburger-ico.png" alt="Open menu" className="min-hamburger-img" />
      </button>

      <nav
        ref={menuRef}
        className={`min-nav ${menuOpen ? 'slide-in' : ''}`}
        aria-hidden={!menuOpen}
      >
        {/* Close button (always in DOM) */}
        <button
          className={`min-close-button ${menuOpen ? '' : 'hidden'} ${closeRolling ? 'rolling' : ''}`}
          onClick={triggerClose}
          onAnimationEnd={onCloseAnimEnd}
          aria-label="Close menu"
        >
          ✕
        </button>

        <ul className="min-menu-list">
          <li>
            <Link to="/" className={pathname === '/' ? 'active' : ''} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>

          <li className={`min-dropdown ${dropdownOpen ? 'open' : ''}`}>
            <button
              className={`min-dropdown-toggle ${servicesPaths.includes(pathname) ? 'active' : ''}`}
              onClick={() => setDropdownOpen(o => !o)}
              aria-expanded={dropdownOpen}
            >
              Services <span className="min-arrow" />
            </button>
            <div className={`min-dropdown-content ${dropdownOpen ? 'show' : ''}`}>
              {servicesPaths.map(path => (
                <Link
                  key={path}
                  to={path}
                  className={pathname === path ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {path
                    .replace('/', '')
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
              ))}
            </div>
          </li>

          <li>
            <Link to="/portfolio" className={pathname === '/portfolio' ? 'active' : ''} onClick={() => setMenuOpen(false)}>
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="/#support" className={pathname === '/#support' ? 'active' : ''} onClick={() => setMenuOpen(false)}>
              Support
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavbarMin;
