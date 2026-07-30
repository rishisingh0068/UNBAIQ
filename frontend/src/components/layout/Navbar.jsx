import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

import { navigationLinks } from "../../data/navigation";
import colorLogo from "../../assets/logo/logo.svg";
import whiteLogo from "../../assets/logo/logoWhite.svg";

const NAVBAR_HEADER_CONTAINER =
  "mx-auto w-full max-w-[1720px] px-4 sm:px-6 lg:px-14 xl:px-20 2xl:px-24";

const backdropVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const drawerVariants = {
  hidden: {
    x: "100%",
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.12,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const linksContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.08,
    },
  },
};

const linkVariants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const isHomeLikePage = ["/", "/about"].includes(location.pathname);
  const isCaseStudyPage = location.pathname === "/case-study";

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((previous) => !previous);
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`
          ${isCaseStudyPage ? "fixed" : "absolute"}
          inset-x-0
          top-0
          ${isMenuOpen ? "z-[10002]" : "z-[9990]"}
          w-full
          transition-all
          duration-300
          ${
            isHomeLikePage
              ? "bg-transparent"
              : "bg-white"
          }
        `}
      >
        <div
          className={`
            ${NAVBAR_HEADER_CONTAINER}
            grid
            h-[68px]
            grid-cols-[1fr_auto]
            items-center
            sm:h-[72px]
            lg:h-[88px]
            xl:grid-cols-[400px_minmax(0,1fr)]
            2xl:grid-cols-[484px_minmax(0,1fr)]
          `}
        >
          {/* Logo */}
          <NavLink
            to="/"
            onClick={closeMenu}
            aria-label="Go to home page"
            className="
              relative
              z-[9993]
              flex
              shrink-0
              items-center
              justify-start
            "
          >
            <img
              src={isHomeLikePage ? whiteLogo : colorLogo}
              alt="Unbaiq"
              className="
                h-[38px]
                w-auto
                object-contain
                sm:h-[42px]
                lg:h-[71.64px]
                lg:w-[166px]
              "
            />
          </NavLink>

          {/* Desktop navigation group */}
          <div className="hidden h-[40px] w-full min-w-0 items-center gap-6 xl:flex">
            <nav
              aria-label="Main navigation"
              className="flex min-w-0 items-center gap-5 2xl:gap-8"
            >
            {navigationLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `
                    group
                    relative
                    whitespace-nowrap
                    py-2
                    font-lexend
                    text-[14px]
                    font-normal
                    tracking-[-0.02em]
                    transition-colors
                    duration-300
                    xl:text-[15px]
                    2xl:text-[16px]
                    ${
                      isActive
                        ? isHomeLikePage
                          ? "text-white"
                          : "text-[#003866]"
                        : isHomeLikePage
                          ? "text-white/85 hover:text-white"
                          : "text-[#003866]/85 hover:text-[#003866]"
                    }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>

                    <span
                      className={`
                        absolute
                        bottom-0
                        left-0
                        h-px
                        ${isHomeLikePage ? "bg-white" : "bg-[#003866]"}
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }
                      `}
                    />
                  </>
                )}
              </NavLink>
            ))}
            </nav>

            {/* Desktop CTA */}
            <div className="ml-auto flex shrink-0 items-center justify-end">
            <NavLink
              to="/lets-talk"
              className={`
                ${isHomeLikePage ? "lets-talk-btn" : "lets-talk-text-hover"}
                relative
                inline-flex
                h-[40px]
                items-center
                justify-center
                overflow-hidden
                rounded-[58px]
                border
                px-6
                py-2
                text-[15px]
                font-medium
                xl:h-[40px]
                xl:text-[16px]
                ${
                  isHomeLikePage
                    ? "border-white bg-white text-[#173047]"
                    : "border-[#003866] bg-[#003866] text-white"
                }
              `}
            >
              <span className="relative z-10">Let&apos;s Talk</span>
            </NavLink>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className={`
              relative
              z-[9993]
              flex
              h-11
              w-11
              items-center
              justify-center
              justify-self-end
              transition-all
              duration-300
              xl:hidden
              ${
                isHomeLikePage
                  ? "text-white hover:opacity-75"
                  : "text-[#003866] hover:opacity-75"
              }
            `}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.span
                  key="close-icon"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <X size={23} strokeWidth={1.8} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu-icon"
                  initial={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <Menu size={23} strokeWidth={1.8} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="
              fixed
              inset-0
              z-[10000]
              xl:hidden
            "
          >
            {/* Background overlay */}
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`
                absolute
                inset-0
                h-full
                w-full
                cursor-default
                ${isHomeLikePage ? "bg-black/45" : "bg-black/80"}
                backdrop-blur-[4px]
              `}
            />

            {/* Mobile drawer */}
            <motion.aside
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className={`
                absolute
                right-0
                top-[70px]
                z-[10001]
                flex
                flex-col
                overflow-y-auto
                h-[375px]
                max-h-[100dvh]
                w-full
                max-w-none
                ${isHomeLikePage ? "bg-[#064675]" : "bg-white"}
                shadow-[0_12px_35px_rgba(0,0,0,0.16)]
              `}
            >
              {/* Mobile links */}
              <div
                className={`
                  flex
                  flex-1
                  flex-col
                  ${isHomeLikePage ? "bg-[#064675]" : "bg-white"}
                  px-[20px]
                  pb-4
                  pt-2
                `}
              >
                <motion.nav
                  variants={linksContainerVariants}
                  initial="hidden"
                  animate="visible"
                  aria-label="Mobile navigation links"
                >
                  <ul>
                    {navigationLinks.map((item) => (
                      <motion.li
                        key={item.path}
                        variants={linkVariants}
                        className="border-0"
                      >
                        <NavLink
                          to={item.path}
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            `
                              flex
                              relative
                              min-h-[50px]
                              text-[15px]
                              items-center
                              font-semibold
                              transition-all
                              duration-300
                              ${
                                isActive
                                  ? isHomeLikePage
                                    ? "border-l-[3px] border-white pl-2 text-white"
                                    : "border-l-[3px] border-[#064675] pl-2 text-[#064675]"
                                  : isHomeLikePage
                                    ? "text-white/80 hover:translate-x-2 hover:text-white"
                                    : "text-[#064675] hover:translate-x-2"
                              }
                            `
                          }
                        >
                          {item.label}
                        </NavLink>
                      </motion.li>
                    ))}
                  </ul>
                </motion.nav>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.58,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-3"
                >
                  <NavLink
                    to="/lets-talk"
                    onClick={closeMenu}
                    className={`
                      ${isHomeLikePage ? "lets-talk-btn" : "lets-talk-text-hover"}
                      relative
                      flex
                      h-[36px]
                      w-full
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-full
                      ${isHomeLikePage ? "border border-white bg-white text-[#064675]" : "border border-[#064675] bg-[#064675] text-white"}
                      text-[12px]
                      font-semibold
                      shadow-none
                      transition-all
                      duration-300
                    `}
                  >
                    <span className="relative z-10">Let&apos;s Talk</span>
                  </NavLink>
                </motion.div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
