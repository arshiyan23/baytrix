import '../styles/floating-blobs.css'
import { useEffect } from 'react';


//random blobs func
function getRandomBlobStyle() {
  const size = Math.floor(Math.random() * 60) + 40;
  const top = Math.floor(Math.random() * 300);
  const left = Math.floor(Math.random() * 100);
  const duration = (Math.random() * 4 + 5).toFixed(1);
  return {
    width: `${size}px`,
    height: `${size}px`,
    top: `${top}px`,
    left: `${left}%`,
    animationDuration: `${duration}s`,
  };
}


function FloatingBlobs() {
    //random blobs 
    useEffect(() => {
        const items = document.querySelectorAll(".brnd-feature-card");
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

    const blobs = Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="brnd-floating-blob" style={getRandomBlobStyle()} />
    ));

    return blobs;
}

export default FloatingBlobs;