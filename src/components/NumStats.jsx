import ProcessHeading from "./ProcessHeading";
import { useEffect } from 'react';
import "../styles/num-stats.css"

function NumStats({ backgroundText, foregroundText, statsData }) {

  useEffect(() => {
    statsData.forEach(({ id, targetValue }) => {
      const el = document.getElementById(id);
      const parent = el?.closest(".num-stat-item");
      if (!el || !parent) return;

      // Extract numeric part and suffix (e.g., 99.9%, 10K+)
      const match = targetValue.toString().match(/^(\d+(\.\d+)?)([^\d]*)$/);
      if (!match) return;

      const [, numberStr, , suffix = ""] = match;
      const end = parseFloat(numberStr);

      const animate = () => {
        const duration = 1000;
        const startTime = performance.now();

        const update = (currentTime) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const currentValue = targetValue.includes(".")
            ? (progress * end).toFixed(1)
            : Math.floor(progress * end);
          el.textContent = `${currentValue}${suffix}`;
          if (progress < 1) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            parent.classList.add("visible");
            animate();
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(parent);
    });
  }, [statsData]);


  return (
    <section className="num-stat-section">
      <div className="num-stat-wrapper">
        <ProcessHeading
          backgroundText={backgroundText}
          foregroundText={foregroundText}
          backgroundTextFill="#f5f0ff"
          description="Proven experience, lasting client relationships, and successful projects —
           backed by strong retention and glowing reviews."
        />
        <div className="num-stat-container">
          {statsData.map(({ id, icon, value, label }, index) => (
            <div className="num-stat-item" key={id || index}>
              <img src={icon} alt={label} className="num-stat-icon" />
              <div className="num-stat-number" id={id}>{value}</div>
              <p className="num-stat-text">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NumStats;
