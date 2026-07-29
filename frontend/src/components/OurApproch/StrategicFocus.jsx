import strategicFocusHero from "../../assets/images/ourApproch/strategicFocus/strategic-focus-hero.svg";
import discoverIcon from "../../assets/images/ourApproch/strategicFocus/discover.svg";
import designIcon from "../../assets/images/ourApproch/strategicFocus/design.svg";
import buildReleaseIcon from "../../assets/images/ourApproch/strategicFocus/build-release.svg";
import scaleIcon from "../../assets/images/ourApproch/strategicFocus/scale.svg";

const processSteps = [
  {
    id: 1,
    icon: discoverIcon,
    title: "Discover",
    description:
      "To explore your vision, understand your customers, and define the problem to be solved.",
  },
  {
    id: 2,
    icon: designIcon,
    title: "Design",
    description:
      "To shape the look, feel, and user experience of your product.",
  },
  {
    id: 3,
    icon: buildReleaseIcon,
    title: "Build & Release",
    description:
      "To develop, test, refine, and launch your product.",
  },
  {
    id: 4,
    icon: scaleIcon,
    title: "Scale",
    description:
      "Enhancing what already works for your product and business.",
  },
];

const StrategicFocus = () => {
  return (
    <section className="w-full overflow-hidden bg-white font-lexend">
      {/* Top Section */}
      <div
        className="
          relative
          w-full
          overflow-hidden
          bg-white
          px-5
          pt-12
          sm:px-7
          sm:pt-14
          lg:px-10
          xl:px-14
          lg:pt-10
        "
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[580px] top-[10px] hidden h-[900px] w-[900px] rounded-full xl:block"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 99, 255, 0.21) 0%, rgba(99, 99, 255, 0.1) 48%, transparent 74%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[580px] top-[10px] hidden h-[900px] w-[900px] rounded-full xl:block"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 99, 255, 0.21) 0%, rgba(99, 99, 255, 0.1) 48%, transparent 74%)",
          }}
        />

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            max-w-[1320px]
            grid-cols-1
            items-center
            gap-8
            lg:grid-cols-[0.95fr_1.05fr]
            lg:gap-12
            lg:min-h-[547px]
          "
        >
          <div
            className="
              pb-8
              text-center
              sm:pb-10
              lg:pb-0
              lg:text-left
            "
          >
            <h2
              className="
                mx-auto
                max-w-[570px]
                text-[34px]
                font-semibold
                leading-[1.22]
                tracking-[-0.025em]
                text-[#06365f]
                sm:text-[42px]
                lg:mx-0
                lg:text-[53px]
                xl:w-[760px]
                xl:max-w-none
              "
            >
              We craft solutions with a
              <br className="hidden sm:block" />
              strategic focus on your
              <br className="hidden sm:block" />
              goals
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-[600px]
                text-[15px]
                leading-[1.7]
                text-[#65758d]
                sm:text-[16px]
                lg:mx-0
              "
            >
              We create solutions based on your business
              <br className="hidden sm:block" />
              goals, ensuring every product drives
              <br className="hidden sm:block" />
              meaningful results.
            </p>
          </div>

          <div className="flex items-end justify-center lg:justify-end">
            <img
              src={strategicFocusHero}
              alt="Strategic product development process"
              draggable="false"
              className="
                h-auto
                w-full
                max-w-[430px]
                select-none
                object-contain
                sm:max-w-[490px]
                lg:max-w-[530px]
                xl:h-[547px]
                xl:w-[547px]
                xl:max-w-none
              "
            />
          </div>
        </div>
      </div>

      {/* Bottom Process Section */}
      <div
        className="
          w-full
          bg-[#f6f6f6]
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
          <h2
            className="
              text-[32px]
              font-medium
              leading-tight
              tracking-[-0.025em]
              text-[#06365f]
              sm:text-[38px]
              lg:text-[44px]
            "
          >
            Explore. Build. Inspire.
          </h2>

          <p
            className="
              mt-7
              max-w-[1450px]
              text-[14px]
              leading-[1.8]
              text-[#192b4d]
              sm:text-[15px]
              lg:text-[16px]
            "
          >
            We begin by exploring your goals and challenges to uncover
            meaningful opportunities. Then, we build tailored solutions that
            not only solve problems but inspire growth and innovation.
          </p>

          <div
            className="
              relative
              mt-16
              grid
              grid-cols-1
              gap-10
              sm:grid-cols-2
              lg:grid-cols-4
              lg:gap-10
            "
          >
            {processSteps.map((step, index) => (
              <article
                key={step.id}
                className="
                  relative
                  flex
                  flex-col
                  items-start
                "
              >
                {index < processSteps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[30px] top-[29px] z-0 hidden w-[calc(100%+2.5rem)] border-t-2 border-dashed border-[#d5d8df] lg:block"
                  />
                )}

                <div
                  className="
                    relative
                    z-10
                    flex
                    h-[60px]
                    w-[60px]
                    items-center
                    justify-center
                    bg-[#f6f6f6]
                  "
                >
                  <img
                    src={step.icon}
                    alt={step.title}
                    draggable="false"
                    className="
                      h-full
                      w-full
                      select-none
                      object-contain
                    "
                  />
                </div>

                <h3
                  className="
                    mt-5
                    text-[20px]
                    font-medium
                    leading-tight
                    text-[#063d6b]
                    sm:text-[21px]
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                    mt-3
                    max-w-[300px]
                    text-[14px]
                    leading-[1.75]
                    text-[#0d3e67]
                    sm:text-[15px]
                  "
                >
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicFocus;
