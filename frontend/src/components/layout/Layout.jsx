import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  const location = useLocation();
  const isHomeLikePage = ["/", "/about"].includes(location.pathname);

  // Start every client-side route at the top of the page.
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main
        className={
          isHomeLikePage
            ? ""
            : "pt-[72px] sm:pt-[72px] lg:pt-[80px]"
        }
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
