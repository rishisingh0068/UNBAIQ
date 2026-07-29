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
      duration: 0.25,
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
      duration: 0.32,
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
          z-[9990]
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
              className="
                absolute
                inset-0
                h-full
                w-full
                cursor-default
                bg-black/80
                backdrop-blur-[4px]
              "
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
              className="
                absolute
                right-0
                top-0
                z-[10001]
                flex
                h-[100dvh]
                w-[88%]
                max-w-[390px]
                flex-col
                overflow-y-auto
                bg-[#07151d]
                shadow-[-20px_0_55px_rgba(0,0,0,0.45)]
              "
            >
              {/* Mobile drawer header */}
              <div
                className="
                  sticky
                  top-0
                  z-20
                  flex
                  h-[80px]
                  shrink-0
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  bg-[#050505]
                  px-5
                  sm:px-7
                "
              >
                <NavLink
                  to="/"
                  onClick={closeMenu}
                  aria-label="Go to home page"
                  className="flex items-center"
                >
                  <img
                    src={whiteLogo}
                    alt="Unbaiq"
                    className="
                      h-[40px]
                      w-auto
                      object-contain
                    "
                  />
                </NavLink>

                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  className="
                    flex
                    h-[52px]
                    w-[52px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/55
                    text-white
                    transition-all
                    duration-300
                    hover:rotate-90
                    hover:border-white
                    hover:bg-white
                    hover:text-black
                  "
                >
                  <X size={27} strokeWidth={1.7} />
                </button>
              </div>

              {/* Mobile links */}
              <div
                className="
                  flex
                  flex-1
                  flex-col
                  px-7
                  pb-10
                  pt-8
                  sm:px-8
                "
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
                        className="border-b border-white/10"
                      >
                        <NavLink
                          to={item.path}
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            `
                              flex
                              min-h-[69px]
                              items-center
                              text-[19px]
                              font-semibold
                              transition-all
                              duration-300
                              ${
                                isActive
                                  ? "translate-x-0 text-white"
                                  : "text-white/65 hover:translate-x-2 hover:text-white"
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
                  className="mt-9"
                >
                  <NavLink
                    to="/lets-talk"
                    onClick={closeMenu}
                    className="
                      flex
                      h-[60px]
                      w-full
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-[16px]
                      font-semibold
                      text-[#152028]
                      shadow-[0_12px_30px_rgba(0,0,0,0.18)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-[#064e3b]
                      hover:text-[#8ff0ce]
                      hover:shadow-[0_18px_38px_rgba(0,0,0,0.3)]
                    "
                  >
                    Let&apos;s Talk
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
