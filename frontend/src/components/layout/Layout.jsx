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

      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: "instant",
          block: "start",
        });
      });

      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
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
