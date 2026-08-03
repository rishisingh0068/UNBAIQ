import { NavLink } from "react-router-dom";

import caseStudyHero from "../../assets/images/caseStudy/case-study-hero.webp";
import dashboardOne from "../../assets/images/caseStudy/dashboard-1.webp";
import dashboardTwo from "../../assets/images/caseStudy/dashboard-2.webp";
import dashboardThree from "../../assets/images/caseStudy/dashboard-3.webp";
import colorLogo from "../../assets/logo/logo.svg";

const caseStudySections = [
  {
    id: 1,
    title: "The Challenge",
    paragraphs: [
      "Security companies face significant challenges in managing large teams of guards across multiple locations. Manual tracking methods often lead to inefficiencies, lack of real-time visibility, and difficulty ensuring guards are present at their assigned posts. This can result in missing patrols, delayed incident responses and limited accountability.",
      "Supervisors struggle to monitor attendance, shift changes and incident reports without a centralized system. Communication gaps between field staff and management further complicate operations, making it hard to respond quickly to emergencies or verify guard activities.",
      "Additionally, generating accurate reports for clients and maintaining compliance with industry standards is time-consuming and error-prone. These challenges highlight the need for a smart, automated solution to streamline guard management and improve overall security operations.",
    ],
  },
  {
    id: 2,
    title: "The Design",
    paragraphs: [
      "An innovative browser-based EdTech platform was developed to help middle school students better understand maths through interactive digital tools called manipulatives. These visual models align with the National Council of Teachers of Mathematics (NCTM) focal points and state standards for grades 6–8, helping students grasp concepts like adding fractions, measuring time, and understanding X and Y coordinates using intuitive shapes and visuals.",
      "Initially developed by a single developer using CanvasJS, the first version of the product lacked reusability and scalability. Each new feature had to be manually implemented across all 16 manipulatives—sometimes requiring the same code to be written up to 48 times. This created unnecessary rework and slowed down development.",
      "To resolve these challenges, the platform was re-architected using an object-oriented design with reusable components, significantly reducing duplication and improving efficiency. A runtime environment was also added to support live use during webinars and remote teaching sessions.",
      "The solution is now widely adopted by teachers and students, both in classrooms and through regular educator webinars. It has become a powerful, scalable teaching tool that enhances student engagement and enables more effective remote and in-person math instruction.",
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
          px-4
          pb-12
          pt-5
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
          className="absolute right-4 top-4 z-20 sm:right-7 lg:right-10 lg:top-5 xl:right-14"
        >
          <img
            src={colorLogo}
            alt="Unbaiq"
            className="h-auto w-[100px] object-contain sm:w-[145px] lg:w-[166px]"
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
          <div className="flex min-w-0 items-start gap-1 pr-[120px] text-[11px] font-light leading-[1.45] text-[#173f61] sm:items-center sm:gap-2 sm:pr-[170px] sm:text-[13px] lg:pr-0 lg:text-[14px]">
            <NavLink
              to="/"
              className="shrink-0 transition-opacity hover:opacity-65"
            >
              Home
            </NavLink>
            <span
              aria-hidden="true"
              className="shrink-0 font-light leading-[1.45]"
            >
              &gt;
            </span>
            <span className="min-w-0 flex-1 text-left">
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
            <div className="order-2 text-left lg:order-1">
              <h1
                className="
                  mx-0
                  max-w-[520px]
                  text-[26px]
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
                <br />
                track and manage
                <br />
                security guards in
                <br />
                real time.
              </h1>
            </div>

            <div className="relative order-1 flex justify-center lg:order-2 lg:mt-7 lg:justify-end">
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
                fetchPriority="high"
                decoding="async"
                draggable="false"
                className="
                  h-auto
                  w-full
                  relative
                  z-10
                  max-w-[240px]
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
                  loading="lazy"
                  decoding="async"
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
              We developed a comprehensive, cloud-based guard management
              platform that enables real-time tracking and management of
              security personnel across multiple locations. The solution
              leverages GPS technology and mobile devices to monitor guard
              positions, attendance and shift changes, providing supervisors
              with instant visibility and actionable insights.
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
              The platform features automated scheduling, digital check-ins and
              check-outs, and incident reporting tools, all accessible through
              an intuitive dashboard. Guards can submit reports, receive
              assignments and communicate with supervisors directly from their
              mobile devices, reducing paperwork and improving response times.
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
              Advanced analytics and reporting modules generate detailed logs
              for clients and management, ensuring compliance and transparency.
              Automated alerts notify supervisors of missed patrols, late
              check-ins or emergencies, enabling proactive intervention and
              enhanced accountability.
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
              By centralizing operations and streamlining communication, the
              solution empowers security companies to optimize resource
              allocation, improve service quality and deliver greater value to
              their clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolSecurityCaseStudy;
