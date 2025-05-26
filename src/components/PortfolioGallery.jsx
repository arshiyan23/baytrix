import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { portfolioItems } from '../data/portfolioData';
import '../styles/portfolio-gallery.css';

const categories = [
  'All',
  'Branding',
  'Application Design',
  'Social Media Management',
  'Marketing Ads',
  'AI Integration',
];

export default function PortfolioGallery() {
  const [activeCat, setActiveCat] = useState('All');
  const [activeIndex, setActiveIndex] = useState(null);
  const itemRefs = useRef([]);
  const isMobile = useRef(false);

  const filtered = useMemo(() => {
    if (activeCat === 'All') return portfolioItems;
    return portfolioItems.filter((i) => i.category === activeCat);
  }, [activeCat]);

  useEffect(() => {
    isMobile.current = window.innerWidth <= 768;
    if (!isMobile.current) return;

    const handleScroll = () => {
      let closestIndex = null;
      let closestDistance = Infinity;

      itemRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const centerY = window.innerHeight / 2;
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(centerY - itemCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial run

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [filtered]);


  return (
    <section className="gallery-section">
      <nav className="gallery-nav">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`gallery-nav-item${cat === activeCat ? ' active' : ''}`}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="gallery-grid">
        {filtered.map((item, index) => {
          const isMobileVisible = index === activeIndex;
          const itemClass = isMobileVisible ? 'gallery-item mobile-scroll-show' : 'gallery-item';

          return (
            <Link
              key={`${activeCat}-${item.id}`}
              to={`/portfolio/${item.id}`}
              className={itemClass}
              ref={el => (itemRefs.current[index] = el)}
            >
              <div className="image-wrapper">
                <img src={item.images[0]} alt={item.title} />
                <div className="overlay">
                  <div className="overlay-content">
                    <h3>{item.title}</h3>
                    <p>{item.year} • {item.category}</p>
                    <p className="ratings">
                      <span>⭐ {item.rating}/10</span>
                    </p>
                    <p className="desc">{item.description}</p>
                    <span className="view-more">
                      View More <span className="arrow">→</span>
                    </span>
                  </div>
                </div>
              </div>
              <h4>{item.title}</h4>
              <p>{item.category}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
