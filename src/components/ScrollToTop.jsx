import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    const targetPaths = [
      "/application-design",
      "/branding",
      "/web-development",
      "/social-media-management",
      "/terms",
      "/refund-policy",
      "/privacy-policy",
    ];
  
    if (targetPaths.includes(pathname)) {
      const html = document.documentElement;
      const prevScroll = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
  
      window.scrollTo(0, 0);
  
      setTimeout(() => {
        html.style.scrollBehavior = prevScroll || "";
      }, 100);
    }
  }, [pathname]);  

  return null;
}

export default ScrollToTop;
