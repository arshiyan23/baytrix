import React, { useState, useMemo } from 'react';
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

  const filtered = useMemo(() => {
    if (activeCat === 'All') return portfolioItems;
    return portfolioItems.filter((i) => i.category === activeCat);
  }, [activeCat]);

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
        {filtered.map((item) => (
          <Link
            key={`${activeCat}-${item.id}`}
            to={`/portfolio/${item.id}`}
            className="gallery-item"
          >
            <div className="image-wrapper">
              <img src={item.images[0]} alt={item.title} />
              <div className="overlay">
                <span>View More</span>
              </div>
            </div>
            <h4>{item.title}</h4>
            <p>{item.category}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
