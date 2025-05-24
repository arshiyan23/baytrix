import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    const targetPaths = [
      //include the pages that don't need to be scrolled to the top on load  
      // for e.g, "/branding"
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
