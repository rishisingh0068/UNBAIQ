import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  const location = useLocation();
  const isHomeLikePage = ["/", "/about"].includes(location.pathname);
  const isNavbarHidden = location.pathname === "/case-study";

  // Start every client-side route at the top of the page.
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.slice(1);
      let attempts = 0;
      let timerId;

      // Retry briefly because routed page sections may render after navigation.
      const scrollToHashTarget = () => {
        const target = document.getElementById(targetId);

        if (target) {
          target.scrollIntoView({ behavior: "auto", block: "start" });
          return;
        }

        attempts += 1;
        if (attempts < 10) {
          timerId = window.setTimeout(scrollToHashTarget, 50);
        }
      };

      timerId = window.setTimeout(scrollToHashTarget, 0);
      return () => window.clearTimeout(timerId);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    return undefined;
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-white">
      {!isNavbarHidden && <Navbar />}

      <main
        className={
          isHomeLikePage || isNavbarHidden
            ? ""
            : "pt-[72px] sm:pt-[72px] lg:pt-[88px]"
        }
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
