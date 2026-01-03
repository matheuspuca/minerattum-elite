import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Handle hash navigation (anchor links)
    if (hash) {
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      let tries = 0;

      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }

        // Wait for lazy-loaded pages / transitions to mount
        if (tries < 40) {
          tries += 1;
          requestAnimationFrame(tryScroll);
        }
      };

      tryScroll();
      return;
    }

    // Scroll to top immediately on route change (not smooth, to avoid animation conflict)
    if (prevPathname.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      prevPathname.current = pathname;
    }
  }, [pathname, hash]);

  return null;
};
