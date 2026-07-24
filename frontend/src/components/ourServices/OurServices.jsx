import servicesHero from "../../assets/images/ourServices/services-hero.svg";

import graphicDesignIcon from "../../assets/images/ourServices/graphic-design.svg";
import webDevelopmentIcon from "../../assets/images/ourServices/web-development.svg";
import seoAdvertisingIcon from "../../assets/images/ourServices/seo-advertising.svg";
import mobileApplicationIcon from "../../assets/images/ourServices/mobile-application.svg";
import uiUxDesignIcon from "../../assets/images/ourServices/ui-ux-design.svg";
import digitalMarketingIcon from "../../assets/images/ourServices/digital-marketing.svg";
import {
  CONTENT_CONTAINER,
  NAVBAR_GUTTERS,
} from "../../styles/theme";

const services = [
  {
    id: 1,
    title: "Graphic Design",
    icon: graphicDesignIcon,
    description:
      "Creative branding, marketing materials, and visual storytelling that make your business stand out and connect with your audience.",
  },
  {
    id: 2,
    title: "Web Development",
    icon: webDevelopmentIcon,
    description:
      "Custom websites and web applications built for performance, scalability, and seamless user experience—tailored to your business needs.",
  },
  {
    id: 3,
    title: "SEO & Advertising",
    icon: seoAdvertisingIcon,
    description:
      "Boost your online presence with expert SEO strategies and targeted advertising campaigns that drive traffic, increase visibility, and deliver measurable results.",
  },
  {
    id: 4,
    title: "Mobile Application",
    icon: mobileApplicationIcon,
    description:
      "We create intuitive and reliable mobile applications that deliver seamless experiences across different devices.",
  },
  {
    id: 5,
    title: "UI/UX Design",
    icon: uiUxDesignIcon,
    description:
      "We design clean, engaging, and user-friendly digital experiences focused on usability and customer satisfaction.",
  },
  {
    id: 6,
    title: "Digital Marketing",
    icon: digitalMarketingIcon,
    description:
      "Build awareness, attract customers, and accelerate business growth through result-driven digital marketing.",
  },
];

const OurServices = () => {
  return (
    <section className="w-full overflow-hidden bg-[#fbfbfd]">
      {/* Hero Section */}
      {/* Shared gutters keep this page aligned with the navbar. */}
      <div className={`w-full py-14 sm:py-18 lg:py-24 ${NAVBAR_GUTTERS}`}>
        <div
          className={`
            grid
            grid-cols-1
            items-center
            gap-10
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-16
            ${CONTENT_CONTAINER}
          `}
        >
          {/* Hero Content */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <h1
              className="
                mx-auto
                max-w-[560px]
                text-[34px]
                font-extrabold
                leading-[1.12]
                tracking-[-0.025em]
                text-[#063d6b]
                sm:text-[44px]
                lg:mx-0
                lg:text-[54px]
              "
            >
              Empowering Your
              <br className="hidden sm:block" />
              Vision with
              <br className="hidden sm:block" />
              Advanced Solutions.
            </h1>

            <p
              className="
                mx-auto
                mt-5
                max-w-[500px]
                text-[14px]
                leading-[1.75]
                text-[#66788d]
                sm:text-[15px]
                lg:mx-0
                lg:text-[16px]
              "
            >
              Explore a suite of custom software designed to spark innovation,
              optimize operations, and accelerate your business growth.
            </p>
          </div>

          {/* Hero Image */}
          <div
            className="
              order-1
              flex
              items-center
              justify-center
              lg:order-2
              lg:justify-end
            "
          >
            <img
              src={servicesHero}
              alt="Business technology and analytics solutions"
              draggable="false"
              className="
                h-auto
                w-full
                max-w-[380px]
                select-none
                object-contain
                sm:max-w-[460px]
                lg:max-w-[560px]
              "
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div
        className={`w-full bg-white py-14 sm:py-16 lg:py-20 ${NAVBAR_GUTTERS}`}
      >
        <div className={CONTENT_CONTAINER}>
          <div className="mx-auto max-w-[760px] text-center">
            <p className="text-[18px] font-medium uppercase tracking-[0.12em] text-[#3737b8] sm:text-[20px]">
              What We Do?
            </p>

            <h2 className="mt-3 text-[30px] font-bold leading-[1.18] tracking-[-0.03em] text-[#00355f] sm:text-[38px] lg:text-[48px]">
              Services That Help You Grow
            </h2>
          </div>

          <div
            className="
              mt-12
              grid
              w-full
              grid-cols-1
              gap-x-8
              gap-y-11
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {services.map((service) => (
              <article
                key={service.id}
                className="
                  group
                  relative
                  min-h-[190px]
                  min-w-0
                  w-full
                  overflow-visible
                  rounded-[10px]
                  bg-[#f8f8f8]
                  px-7
                  pb-5
                  pt-[68px]
                  shadow-[0_8px_22px_rgba(0,0,0,0.055)]
                  transition-all
                  duration-300
                  hover:-translate-y-1.5
                  hover:shadow-[0_14px_30px_rgba(0,0,0,0.1)]
                  sm:px-8
                "
              >

                <div
                  className="
                    absolute
                    -top-3
                    left-6
                    z-10
                    flex
                    h-[60px]
                    w-[92px]
                    items-center
                    justify-center
                    sm:left-7
                  "
                >
                  <img
                    src={service.icon}
                    alt=""
                    aria-hidden="true"
                    draggable="false"
                    className="
                      h-full
                      w-full
                      select-none
                      object-contain
                      drop-shadow-[0_4px_10px_rgba(255,255,255,0.12)]
                    "
                  />
                </div>

                <div
                  className="
                    pointer-events-none
                    absolute
                    right-6
                    top-5
                    flex
                    h-[44px]
                    w-[44px]
                    items-center
                    justify-center
                  "
                >
                  <span
                    className="
                      h-[34px]
                      w-[34px]
                      rounded-full
                      border-[4px]
                      border-dotted
                      border-[#d9ddf5]
                    "
                  />
                </div>

                <h3
                  className="
                    break-words
                    text-[17px]
                    font-semibold
                    leading-[1.3]
                    text-[#00355f]
                    sm:text-[18px]
                  "
                >
                  {service.title}
                </h3>

                <p
                  className="
                    mt-2
                    break-words
                    text-[12px]
                    leading-[1.55]
                    text-[#17496e]
                    sm:text-[13px]
                  "
                >
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
