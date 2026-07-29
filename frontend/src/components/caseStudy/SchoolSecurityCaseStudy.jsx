import { NavLink } from "react-router-dom";

import caseStudyHero from "../../assets/images/caseStudy/case-study-hero.svg";
import dashboardOne from "../../assets/images/caseStudy/dashboard-1.svg";
import dashboardTwo from "../../assets/images/caseStudy/dashboard-2.svg";
import dashboardThree from "../../assets/images/caseStudy/dashboard-3.svg";
import colorLogo from "../../assets/logo/logo.svg";

const caseStudySections = [
  {
    id: 1,
    title: "The Challenge",
    paragraphs: [
      "An innovative browser-based EdTech platform was developed to help middle school students better understand math through interactive digital tools called manipulatives. These visual models align with the National Council of Teachers of Mathematics standards and support learning across Grades 6–8.",
      "The platform allows students to explore points and state standards while helping them understand key concepts such as fractions, measurements, ratios, and coordinate geometry.",
      "Initially developed using intuitive shapes and visuals, the first version had limited scalability and usability. Each new feature had to be manually implemented across multiple screens, making the system difficult to maintain and expand.",
      "To solve these challenges, the platform required a more structured and scalable architecture that would support improved performance, easier updates, and a consistent learning experience.",
    ],
  },
  {
    id: 2,
    title: "The Design",
    paragraphs: [
      "The platform was redesigned with a clear focus on usability, accessibility, and student engagement. The visual interface was simplified to make mathematical concepts easier to understand and interact with.",
      "Interactive shapes, graphs, fractions, and measurement tools were organized into logical groups so students could access them quickly. Each tool was designed with clear visual hierarchy and consistent controls.",
      "The layout was made responsive so the platform could work across different screen sizes and devices. The design system also introduced reusable components, consistent spacing, and predictable behavior.",
      "By improving the overall user journey and interface structure, the platform became easier for students to use and more efficient for teachers to manage.",
    ],
  },
];

const SchoolSecurityCaseStudy = () => {
  return (
    <section className="w-full overflow-hidden bg-white">
      {/* Hero Section */}
      <div
        className="
          relative
          w-full
          overflow-hidden
          bg-white
          lg:min-h-[820px]
          px-5
          pb-12
          pt-2
          sm:px-7
          sm:pb-14
          sm:pt-4
          lg:px-10
          xl:px-14
          lg:pb-16
          lg:pt-5
        "
      >
        <NavLink
          to="/"
          aria-label="Go to home page"
          className="absolute right-5 top-4 z-20 sm:right-7 lg:right-10 lg:top-5 xl:right-14"
        >
          <img
            src={colorLogo}
            alt="Unbaiq"
            className="h-auto w-[120px] object-contain sm:w-[145px] lg:w-[166px]"
          />
        </NavLink>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[700px] -top-[200px] hidden h-[1100px] w-[1100px] rounded-full xl:block"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 99, 255, 0.21) 0%, rgba(99, 99, 255, 0.1) 48%, transparent 74%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[700px] -top-[200px] hidden h-[1100px] w-[1100px] rounded-full xl:block"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 99, 255, 0.21) 0%, rgba(99, 99, 255, 0.1) 48%, transparent 74%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1320px]">
          <div className="flex min-w-0 items-center gap-3 text-[12px] font-light leading-[1.5] text-[#173f61] sm:text-[13px] lg:text-[14px]">
            <NavLink
              to="/"
              className="shrink-0 transition-opacity hover:opacity-65"
            >
              Home
            </NavLink>
            <span
              aria-hidden="true"
              className="shrink-0 text-[22px] font-light leading-none"
            >
              {"\u203a"}
            </span>
            <span className="truncate">
              A smart solution to track and manage security guards in real
              time.
            </span>
          </div>

          <div
            className="
              mt-2
              grid
              grid-cols-1
              items-start
              gap-10
              lg:grid-cols-[588px_minmax(0,1fr)]
              lg:gap-14
            "
          >
            <div className="text-center lg:text-left">
              <h1
                className="
                  mx-auto
                  max-w-[520px]
                  text-[34px]
                  font-semibold
                  leading-none
                  tracking-[-0.025em]
                  text-[#063d6b]
                  sm:text-[42px]
                  lg:mx-0
                  lg:h-[264px]
                  lg:w-[588px]
                  lg:max-w-none
                  lg:text-[53px]
                  lg:leading-[66px]
                "
              >
                A smart solution to
                <br className="hidden sm:block" />
                track and manage
                <br className="hidden sm:block" />
                security guards in
                <br className="hidden sm:block" />
                real time.
              </h1>
            </div>

            <div className="relative flex justify-center lg:mt-7 lg:justify-end">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0 hidden h-[165px] w-[986px] bg-[#f3f3f3] lg:block"
                style={{
                  clipPath: "polygon(16% 0, 100% 82%, 100% 100%, 0 100%)",
                }}
              />
              <img
                src={caseStudyHero}
                alt="Security guard management dashboard"
                draggable="false"
                className="
                  h-auto
                  w-full
                  relative
                  z-10
                  max-w-[430px]
                  select-none
                  object-contain
                  sm:max-w-[520px]
                  lg:h-[446px]
                  lg:w-[751px]
                  lg:max-w-none
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Challenge and Design Sections */}
      <div
        className="
          w-full
          px-5
          pb-12
          pt-2
          sm:px-7
          sm:pb-14
          sm:pt-2
          lg:px-10
          xl:px-14
          lg:pb-16
          lg:pt-2
        "
      >
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col gap-14 lg:gap-16">
            {caseStudySections.map((section) => {
              const isChallenge = section.id === 1;

              return (
                <article
                  key={section.id}
                  className={
                    isChallenge
                      ? "grid grid-cols-1 gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-[56px]"
                      : "grid grid-cols-1 gap-5 lg:grid-cols-[180px_1fr] lg:gap-10"
                  }
                >
                  <h2
                    className={
                      isChallenge
                        ? "text-[24px] font-medium leading-tight text-[#063d6b] sm:text-[28px] lg:pt-1"
                        : "text-[24px] font-medium leading-tight text-[#063d6b] sm:text-[28px]"
                    }
                  >
                    {section.title}
                  </h2>

                  <div className={isChallenge ? "max-w-[760px] space-y-4" : "space-y-4"}>
                    {section.paragraphs.map((paragraph, index) => (
                      <p
                        key={`${section.id}-${index}`}
                        className={
                          isChallenge
                            ? "text-[17px] font-light leading-[1.5] text-[#3e9b93] sm:text-[20px] lg:text-[24px] lg:leading-[36px]"
                            : "text-[17px] font-light leading-[1.5] text-[#3e9b93] sm:text-[20px] lg:text-[24px] lg:leading-[36px]"
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Screenshots Strip */}
      <div
        className="
          w-full
          bg-[#fdeaf2]
          px-5
          py-8
          sm:px-7
          sm:py-10
          lg:px-10
          xl:px-14
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1320px]
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {[dashboardOne, dashboardTwo, dashboardThree].map(
            (dashboard, index) => (
              <div
                key={index}
                className="
                  overflow-hidden
                  bg-white
                  p-2
                  shadow-[0_8px_24px_rgba(15,52,86,0.08)]
                "
              >
                <img
                  src={dashboard}
                  alt={`Dashboard screen ${index + 1}`}
                  draggable="false"
                  className="
                    h-auto
                    w-full
                    select-none
                    object-contain
                  "
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Solution Section */}
      <div
        className="
          w-full
          px-5
          py-12
          sm:px-7
          sm:py-14
          lg:px-10
          xl:px-14
          lg:py-16
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1320px]
            grid-cols-1
            gap-5
            lg:grid-cols-[220px_minmax(0,1fr)]
            lg:gap-[56px]
          "
        >
          <h2
            className="
              text-[24px]
              font-medium
              leading-tight
              text-[#063d6b]
              sm:text-[28px]
              lg:pt-1
            "
          >
            The Solution
          </h2>

          <div className="max-w-[760px] space-y-4">
            <p
              className="
                text-[17px]
                font-light
                leading-[1.5]
                text-[#3e9b93]
                sm:text-[20px]
                lg:text-[24px]
                lg:leading-[36px]
              "
            >
              A scalable browser-based platform was developed to help schools
              manage security staff, monitor activities, and access real-time
              information from a centralized dashboard.
            </p>

            <p
              className="
                text-[17px]
                font-light
                leading-[1.5]
                text-[#3e9b93]
                sm:text-[20px]
                lg:text-[24px]
                lg:leading-[36px]
              "
            >
              The new solution introduced reusable components, improved data
              organization, and a more reliable system architecture. This made
              the platform easier to maintain and allowed new functionality to
              be added without rebuilding existing modules.
            </p>

            <p
              className="
                text-[17px]
                font-light
                leading-[1.5]
                text-[#3e9b93]
                sm:text-[20px]
                lg:text-[24px]
                lg:leading-[36px]
              "
            >
              Administrators can now view schedules, manage staff, track
              movement, monitor updates, and analyze operational data through a
              clear and responsive interface.
            </p>

            <p
              className="
                text-[17px]
                font-light
                leading-[1.5]
                text-[#3e9b93]
                sm:text-[20px]
                lg:text-[24px]
                lg:leading-[36px]
              "
            >
              The final product delivers better usability, stronger
              performance, and a consistent experience across desktop, tablet,
              and mobile devices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolSecurityCaseStudy;
