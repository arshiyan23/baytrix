import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import "../styles/num-stats.css";

function NumStats({ statsData }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // trigger count-up in staggered fashion
          statsData.forEach(({ id, targetValue }, i) => {
            setTimeout(() => animateValue(id, targetValue), i * 500);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
  }, [statsData]);

  const animateValue = (id, targetValue) => {
    const el = document.getElementById(id);
    if (!el) return;
    const match = targetValue.toString().match(/^(\d+(\.\d+)?)([^\d]*)$/);
    if (!match) return;
    const [, numStr, , suffix = ""] = match;
    const end = parseFloat(numStr);
    const duration = 5000;
    const start = performance.now();

    const update = now => {
      const prog = Math.min((now - start) / duration, 1);
      const val = targetValue.includes('.')
        ? (prog * end).toFixed(1)
        : Math.floor(prog * end);
      el.textContent = `${val}${suffix}`;
      if (prog < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  // Variants
  const sectionVariants = {
    hidden: { y: -350 },               // no opacity here
    visible: {
      y: 0,
      transition: {
        when: "beforeChildren",
        duration: 0.5,
        delayChildren: 0.5,
        staggerChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -80 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.section
      className="white-bg-wrapper"
      ref={containerRef}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "0px 0px -300px 0px"
      }}
    >
      <div className="num-stat-section">
        <motion.div
          className="num-stat-container"
        // empty; children will be staggered by parent
        >
          {statsData.map(({ id, icon, value, label }) => (
            <motion.div
              className="num-stat-item"
              key={id}
              variants={itemVariants}
            >
              <img src={icon} alt={label} className="num-stat-icon" />
              <div className="num-stat-number" id={id}>{value}</div>
              <p className="num-stat-text">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default NumStats;
