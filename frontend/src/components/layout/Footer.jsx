import { NavLink } from "react-router-dom";

import logo from "../../assets/logo/logoWhite.svg";

const navigationItems = [
  { label: "Home", path: "/" },
  { label: "What We Do", path: "/what-we-do" },
  { label: "Our Approach", path: "/our-approach" },
  { label: "Our Services", path: "/services" },
  { label: "Success Stories", path: "/success-stories" },
  { label: "About", path: "/about" },
  { label: "Contact US", path: "/lets-talk" },
];

const socialLinkClass = `
  flex
  w-fit
  items-center
  gap-2
  text-[14px]
  font-light
  text-white/70
  transition-all
  duration-300
  hover:translate-x-1
  hover:text-white
  sm:text-[15px]
`;

const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-[18px] w-[18px] shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 10v7" />
    <path d="M8 7.5v.01" />
    <path d="M12 17v-4a3 3 0 0 1 6 0v4" />
    <path d="M12 10v7" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-[18px] w-[18px] shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle
      cx="17.5"
      cy="6.5"
      r="0.7"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-[18px] w-[18px] shrink-0"
    fill="currentColor"
  >
    <path d="M14.2 8.1V6.7c0-.7.5-.9 1-.9h2.6V2.2L14.3 2C10.8 2 9 4.1 9 6.3v1.8H6v4.1h3V22h4.5v-9.8h3.4l.6-4.1h-4.1Z" />
  </svg>
);

const XIcon = () => (
  <span
    aria-hidden="true"
    className="flex h-[18px] w-[18px] shrink-0 items-center justify-center text-[21px] font-light leading-none"
  >
    𝕏
  </span>
);

const Footer = () => {
  // Prevent navigation until the newsletter API is connected.
  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <footer className="bg-[#072A47] font-lexend text-white">
      <div
        className="
          mx-auto
          w-full
          max-w-[1800px]
          px-5
          py-10
          sm:px-8
          sm:py-12
          lg:px-[70px]
          lg:py-[56px]
          xl:px-[100px]
        "
      >
        <div
          className="
            grid
            grid-cols-3
            gap-x-6
            gap-y-9
            md:grid-cols-2
            lg:grid-cols-[1.9fr_0.7fr_0.55fr_0.75fr]
            lg:gap-10
            xl:gap-14
          "
        >
          {/* Left section */}
          <div className="col-span-3 md:col-span-1">
            <NavLink
              to="/"
              aria-label="Go to home page"
              className="inline-flex"
            >
              <img
                src={logo}
                alt="Unbaiq"
                className="
                  h-auto
                  w-[155px]
                  object-contain
                  sm:w-[170px]
                  lg:w-[185px]
                "
              />
            </NavLink>

            <p
              className="
                mt-5
                max-w-[575px]
                text-[14px]
                font-light
                leading-[1.65]
                text-white/70
                sm:text-[15px]
                lg:text-[16px]
              "
            >
              We design world-class digital products to help startups and
              Fortune 500 companies delight humans on the other side of the
              screen.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <h3 className="text-[16px] font-medium text-white sm:text-[17px]">
                Subscribe To Our Newsletter
              </h3>

              <form
                onSubmit={handleNewsletterSubmit}
                className="
                  mt-3
                  flex
                  max-w-[525px]
                  items-center
                  rounded-[10px]
                  border
                  border-white/60
                  p-[5px]
                "
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    px-3
                    py-2.5
                    text-[14px]
                    text-white
                    outline-none
                    placeholder:text-white/55
                    sm:px-4
                  "
                />

                <button
                  type="button"
                  aria-label="Subscribe to newsletter"
                  className="
                    flex
                    h-[42px]
                    shrink-0
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-[8px]
                    bg-[#9EB1C3]
                    px-5
                    text-[14px]
                    font-normal
                    text-[#072A47]
                    transition-all
                    duration-200
                    hover:bg-[#b3c2cf]
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-white
                    active:scale-[0.97]
                    sm:min-w-[118px]
                  "
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Copyright */}
            <div
              className="
                mt-5
                flex
                flex-wrap
                items-center
                gap-x-4
                gap-y-2
                text-[12px]
                font-light
                text-white/70
                sm:text-[13px]
              "
            >
              <NavLink
                to="/privacy-policy"
                className="transition-colors duration-300 hover:text-white"
              >
                Privacy Policy
              </NavLink>

              <span className="hidden h-5 w-px bg-white/60 sm:block" />

              <p>© 2025 Unbaiq All Rights Reserved</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[16px] font-medium text-white sm:text-[17px]">
              Navigation
            </h4>

            <nav className="mt-4 flex flex-col gap-[12px]">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="
                    w-fit
                    text-[13px]
                    font-light
                    text-white/70
                    transition-all
                    duration-300
                    hover:translate-x-1
                    hover:text-white
                    sm:text-[14px]
                  "
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-[16px] font-medium text-white sm:text-[17px]">
              Locations
            </h4>

            <div className="mt-4 flex flex-col gap-5">
              <div>
                <p className="text-[15px] font-normal text-white sm:text-[16px]">
                  India Office
                </p>
                <p className="mt-1 text-[14px] font-light leading-[1.5] text-white/70 sm:text-[15px]">
                  Noida, Uttar
                  <br />
                  Pradesh
                </p>
              </div>

              <div>
                <p className="text-[15px] font-normal text-white sm:text-[16px]">
                  Dubai Office
                </p>
                <p className="mt-1 text-[14px] font-light leading-[1.5] text-white/70 sm:text-[15px]">
                  Dubai, UAE
                </p>
              </div>
            </div>
          </div>

          {/* Social media */}
          <div>
            <h4 className="text-[16px] font-medium text-white sm:text-[17px]">
              Social Media
            </h4>

            <div className="mt-4 flex flex-col gap-[14px]">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
              >
                <LinkedinIcon />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
              >
                <XIcon />
                <span>Twitter</span>
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
              >
                <InstagramIcon />
                <span>Instagram</span>
              </a>

              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
              >
                <FacebookIcon />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
