import bringIdeasHero from "../../assets/images/whatWeDo/bringIdeas/bring-ideas-hero.svg";
import productDevelopment from "../../assets/images/whatWeDo/bringIdeas/product-development.svg";
import customSoftware from "../../assets/images/whatWeDo/bringIdeas/custom-software.svg";
import digitalTransformation from "../../assets/images/whatWeDo/bringIdeas/digital-transformation.svg";

const solutions = [
  {
    id: 1,
    icon: productDevelopment,
    title: "Product Development",
    description:
      "Make your product vision concrete through our product discovery and design process.",
  },
  {
    id: 2,
    icon: customSoftware,
    title: "Custom Software",
    description:
      "Solve your unique business challenges with a tailor-made solution.",
  },
  {
    id: 3,
    icon: digitalTransformation,
    title: "Digital Transformation",
    description:
      "Fundamentally change how you operate and deliver value to customers.",
  },
];

const BringIdeas = () => {
  return (
    <main className="w-full overflow-hidden bg-white">
      {/* Hero Section */}
      <section
        className="
          w-full
          bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_34%,#f8f7ff_68%,#efedff_100%)]
          px-5
          pt-12
          sm:px-7
          sm:pt-16
          lg:px-10
          xl:px-14
          lg:pt-20
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1320px]
            grid-cols-1
            items-center
            gap-8
            lg:grid-cols-[0.92fr_1.08fr]
            lg:gap-10
          "
        >
          {/* Left Content */}
          <div
            className="
              pb-8
              text-center
              sm:pb-10
              lg:pb-16
              lg:text-left
            "
          >
            <h1
              className="
                mx-auto
                max-w-[500px]
                text-[32px]
                font-extrabold
                leading-[1.16]
                tracking-[-0.025em]
                text-[#06365f]
                sm:text-[40px]
                lg:mx-0
                lg:text-[46px]
              "
            >
              Bring ideas to life
              <br />
              quickly and expertly
            </h1>

            <p
              className="
                mx-auto
                mt-4
                max-w-[430px]
                text-[14px]
                leading-[1.7]
                text-[#6d7a97]
                sm:text-[15px]
                lg:mx-0
              "
            >
              Scalable, expert-led development—when
              <br className="hidden sm:block" />
              you need it, how you need it.
            </p>
          </div>

          {/* Right Hero Image */}
          <div
            className="
              flex
              items-end
              justify-center
              lg:justify-end
            "
          >
            <img
              src={bringIdeasHero}
              alt="Expert working on product development"
              draggable="false"
              className="
                h-auto
                w-full
                max-w-[500px]
                select-none
                object-contain
                sm:max-w-[540px]
                lg:max-w-[580px]
              "
            />
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section
        className="
          w-full
          bg-[#fafafa]
          px-5
          py-12
          sm:px-7
          sm:py-14
          lg:px-10
          xl:px-14
          lg:py-14
        "
      >
        <div className="mx-auto max-w-[1320px]">
          {/* Heading Area */}
          <div
            className="
              grid
              grid-cols-1
              gap-5
              lg:grid-cols-[0.9fr_1.1fr]
            "
          >
            <h2
              className="
                max-w-[520px]
                text-[30px]
                font-extrabold
                leading-[1.18]
                tracking-[-0.02em]
                text-[#252d50]
                sm:text-[36px]
                lg:text-[40px]
              "
            >
              Solutions shaped around
              <br />
              your needs
            </h2>

            {/* Dotted Arrow Design */}
            <div className="hidden items-start justify-start pt-1 lg:flex">
              <svg
                width="165"
                height="95"
                viewBox="0 0 165 95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M8 7C50 18 77 27 82 48C87 67 67 76 52 68C40 62 42 43 57 41C78 39 103 58 118 78"
                  stroke="#9BA7BE"
                  strokeWidth="1.4"
                  strokeDasharray="5 6"
                  strokeLinecap="round"
                />
                <path
                  d="M112 68L125 82L119 60"
                  stroke="#455674"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M125 82L108 73"
                  stroke="#455674"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Description */}
          <p
            className="
              mt-8
              max-w-[1120px]
              text-[13px]
              leading-[1.7]
              text-[#4e5872]
              sm:text-[14px]
            "
          >
            Leverage our expertise and resources to solve your business
            challenges quickly and cost-effectively. When off-the-shelf
            solutions fall short, we deliver what&apos;s truly needed.
          </p>

          {/* Solution Items */}
          <div
            className="
              mt-10
              grid
              grid-cols-1
              gap-10
              sm:grid-cols-2
              lg:grid-cols-3
              lg:gap-14
            "
          >
            {solutions.map((solution) => (
              <div
                key={solution.id}
                className="
                  flex
                  flex-col
                  items-center
                  text-center
                "
              >
                <img
                  src={solution.icon}
                  alt={solution.title}
                  draggable="false"
                  className="
                    h-[42px]
                    w-[42px]
                    select-none
                    object-contain
                    sm:h-[46px]
                    sm:w-[46px]
                  "
                />

                <h3
                  className="
                    mt-3
                    text-[15px]
                    font-bold
                    text-[#064476]
                    sm:text-[16px]
                  "
                >
                  {solution.title}
                </h3>

                <p
                  className="
                    mt-3
                    max-w-[280px]
                    text-[11px]
                    leading-[1.8]
                    text-[#49667e]
                    sm:text-[12px]
                  "
                >
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BringIdeas;
