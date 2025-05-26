// src/components/FloatingIcons.jsx
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/floating-icons.css';
import { useEffect, useState } from 'react';
import { floatingIconsData } from '../data/floatingIconsData';

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

const animationClasses = ['anim-float', 'anim-bounce-spin', 'anim-pulse', 'anim-wiggle'];

function getRandomAnimation() {
  return animationClasses[Math.floor(Math.random() * animationClasses.length)];
}

function FloatingIcons({ category = 'appDevelopment' }) {
  const icons = floatingIconsData[category] || [];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll(".floating-icon");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {icons.map((iconClass, i) => (
        <i
          key={i}
          className={`floating-icon ${iconClass} ${getRandomAnimation()}`}
          style={getRandomStyle(isMobile)}
        />
      ))}
    </>
  );
}

export default FloatingIcons;
