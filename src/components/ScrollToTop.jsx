import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    const targetPaths = [
      // "/branding",
      // "/application-design",
      // "/social-media-management",
      // "/marketing-ads",
      // "/ai-integration",
      // "/terms",
      // "/refund-policy",
      // "/privacy-policy",
      // "/portfolio",
    ];
  
    if (!(targetPaths.includes(pathname))) {
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
