import ProcessHeading from "./ProcessHeading";
import { useEffect } from 'react';

function NumStats({ backgroundText, foregroundText, description, statsData }) {

useEffect(() => {
  statsData.forEach(({ id, targetValue }) => {
    const el = document.getElementById(id);
    const parent = el?.closest(".success-item");
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
    <section className="success-section">
      <div className="success-wrapper">
        <ProcessHeading
          backgroundText={backgroundText}
          foregroundText={foregroundText}
        />
        <p className="success-desc-txt">{description}</p>
        <div className="success-container">
          {statsData.map(({ id, icon, value, label }, index) => (
            <div className="success-item" key={id || index}>
              <img src={icon} alt={label} className="success-icon" />
              <div className="success-number" id={id}>{value}</div>
              <p className="success-text">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NumStats;
