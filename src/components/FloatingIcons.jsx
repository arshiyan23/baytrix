import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/floating-icons.css';
import { useEffect, useState } from 'react';
import { floatingIconsData } from '../data/floatingIconsData';

const animationClasses = ['anim-float', 'anim-bounce-spin', 'anim-pulse', 'anim-wiggle'];

function getRandomAnimation() {
  return animationClasses[Math.floor(Math.random() * animationClasses.length)];
}

function getRandomStyle(isMobile) {
  const size = Math.floor(Math.random() * 30) + (isMobile ? 10 : 50);
  const top = Math.floor(Math.random() * 300);
  const left = Math.floor(Math.random() * 100);
  const duration = (Math.random() * 5 + 4).toFixed(1); // 4–9s
  return {
    fontSize: `${size}px`,
    top: `${top}px`,
    left: `${left}%`,
    animationDuration: `${duration}s`,
  };
}

function FloatingIcons({ category = 'appDevelopment' }) {
  const allIcons = floatingIconsData[category] || [];
  const [isMobile, setIsMobile] = useState(false);
  const [visibleIcons, setVisibleIcons] = useState([]);
  const [fadeClass, setFadeClass] = useState('flt-ico-fade-in');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize random icons once
  useEffect(() => {
    const generateIcons = () =>
      allIcons.map((iconClass) => ({
        className: `${iconClass} ${getRandomAnimation()}`,
        style: getRandomStyle(isMobile),
      }));

    setVisibleIcons(generateIcons());

    const interval = setInterval(() => {
      setFadeClass('flt-ico-fade-out');

      // After fade out completes (1s), change icons
      setTimeout(() => {
        setVisibleIcons(generateIcons());
        setFadeClass('flt-ico-fade-in');
      }, 1000); // match flt-ico-fade-out duration
    }, 4000); // total interval

    return () => clearInterval(interval);
  }, [allIcons, isMobile]);

  return (
    <>
      {visibleIcons.map((icon, i) => (
        <i
          key={i}
          className={`floating-icon ${icon.className} ${fadeClass}`}
          style={icon.style}
        />
      ))}
    </>
  );
}

export default FloatingIcons;
