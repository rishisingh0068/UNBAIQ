import caseStudyHero from "../../assets/images/caseStudy/case-study-hero.svg";
import dashboardOne from "../../assets/images/caseStudy/dashboard-1.svg";
import dashboardTwo from "../../assets/images/caseStudy/dashboard-2.svg";
import dashboardThree from "../../assets/images/caseStudy/dashboard-3.svg";

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
          w-full
          bg-[#fbfbfd]
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
        <div className="mx-auto max-w-[1320px]">
          <p
            className="
            
              text-[11px]
              leading-[1.5]
              text-[#708197]
              sm:text-[12px]
              lg:text-[13px]
              font-bold
            "
          >
            Home &gt; A smart solution to track and manage security guards in
            real time.
          </p>

          <div
            className="
              mt-7
              grid
              grid-cols-1
              items-center
              gap-10
              lg:grid-cols-[0.85fr_1.15fr]
              lg:gap-14
            "
          >
            <div className="text-center lg:text-left">
              <h1
                className="
                  mx-auto
                  max-w-[520px]
                  text-[34px]
                  font-extrabold
                  leading-[1.15]
                  tracking-[-0.025em]
                  text-[#063d6b]
                  sm:text-[42px]
                  lg:mx-0
                  lg:text-[50px]
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

            <div className="flex justify-center lg:justify-end">
              <img
                src={caseStudyHero}
                alt="Security guard management dashboard"
                draggable="false"
                className="
                  h-auto
                  w-full
                  max-w-[430px]
                  select-none
                  object-contain
                  sm:max-w-[520px]
                  lg:max-w-[620px]
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
          py-12
          sm:px-7
          sm:py-14
          lg:px-10
          xl:px-14
          lg:py-16
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
                        ? "text-[24px] font-black leading-tight text-[#063d6b] sm:text-[28px] lg:pt-1"
                        : "text-[24px] font-black leading-tight text-[#063d6b] sm:text-[28px]"
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
                            ? "text-[13px] font-semibold leading-[1.95] text-[#5a6b7a] sm:text-[14px] lg:text-[15px]"
                            : "text-[13px] font-semibold leading-[1.75] text-[#3e7f79] sm:text-[14px] lg:text-[15px]"
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
              font-black
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
                text-[13px]
                leading-[1.95]
                text-[#5a6b7a]
                sm:text-[14px]
                lg:text-[15px]
              "
            >
              A scalable browser-based platform was developed to help schools
              manage security staff, monitor activities, and access real-time
              information from a centralized dashboard.
            </p>

            <p
              className="
                text-[13px]
                leading-[1.95]
                text-[#5a6b7a]
                sm:text-[14px]
                lg:text-[15px]
              "
            >
              The new solution introduced reusable components, improved data
              organization, and a more reliable system architecture. This made
              the platform easier to maintain and allowed new functionality to
              be added without rebuilding existing modules.
            </p>

            <p
              className="
                text-[13px]
                leading-[1.95]
                text-[#5a6b7a]
                sm:text-[14px]
                lg:text-[15px]
              "
            >
              Administrators can now view schedules, manage staff, track
              movement, monitor updates, and analyze operational data through a
              clear and responsive interface.
            </p>

            <p
              className="
                text-[13px]
                leading-[1.95]
                text-[#5a6b7a]
                sm:text-[14px]
                lg:text-[15px]
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
