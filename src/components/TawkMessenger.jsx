import { useEffect } from 'react';

const TawkMessenger = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/6829cbbea2024f190943c900/1irhk7odd";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    script.onload = () => {
      // Wait for Tawk_API to be ready
      const interval = setInterval(() => {
        if (window.Tawk_API && typeof window.Tawk_API.hideWidget === 'function') {
          window.Tawk_API.hideWidget(); // hide default button
          clearInterval(interval);
        }
      }, 200);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default TawkMessenger;
