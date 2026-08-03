import smartGuardLogo from "../../assets/images/whatWeDo/ourWork/smartguard-logo.svg";

const projectTags = ["Discovery", "Design", "Development", "Launch"];

const projects = [
  {
    id: 1,
    title: "Complete Product Development",
    description:
      "We manage the entire product development lifecycle—from market analysis and design to development, quality assurance, and post-launch support.",
    background: "bg-[#edf7ff]",
    type: "blue",
    showLogo: true,
  },
  {
    id: 2,
    title: "Helped 10k+ people find places where they can learn, play, and win",
    description:
      "We manage the entire product development lifecycle—from market analysis and design to development, quality assurance, and post-launch support.",
    background: "bg-[#fff1dc]",
    type: "yellow",
    showLogo: false,
  },
];

const OurWorkShowcase = () => {
  return (
    <section
      className="
        w-full
        bg-white
        px-5
        py-14
        sm:px-7
        sm:py-16
        lg:px-10
        xl:px-14
        lg:py-20
      "
    >
      <div className="mx-auto max-w-[1320px]">
        {/* Heading */}
        <div className="text-center">
          <h2
            className="
              text-[28px]
              font-extrabold
              leading-tight
              tracking-[-0.02em]
              text-[#06365f]
              sm:text-[34px]
              lg:text-[38px]
            "
          >
            Our work speaks for itself...
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-[760px]
              text-[13px]
              leading-7
              text-[#6c7a91]
              sm:text-[14px]
            "
          >
            Our design-first approach has helped transform innovative
            businesses like these.
          </p>
        </div>

        {/* Projects */}
        <div className="mt-12 space-y-5 sm:mt-14 sm:space-y-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`
                relative
                min-h-[315px]
                overflow-hidden
                rounded-[10px]
                px-6
                py-7
                sm:min-h-[340px]
                sm:px-8
                sm:py-8
                lg:min-h-[360px]
                lg:px-12
                lg:py-10
                ${project.background}
              `}
            >
              {/* Decorative background shapes */}
              {project.type === "blue" && (
                <>
                  <div
                    className="
                      absolute
                      bottom-0
                      right-[-40px]
                      h-[155px]
                      w-[62%]
                      origin-bottom-right
                      skew-x-[-27deg]
                      bg-[#b9ddfa]
                      sm:h-[185px]
                      lg:h-[205px]
                    "
                  />

                  <div
                    className="
                      absolute
                      bottom-0
                      right-[24%]
                      h-[95px]
                      w-[28%]
                      origin-bottom-right
                      skew-x-[-35deg]
                      bg-[#d4ebfc]
                      sm:h-[120px]
                    "
                  />
                </>
              )}

              {project.type === "yellow" && (
                <div
                  className="
                    absolute
                    bottom-[-78px]
                    right-[8%]
                    h-[250px]
                    w-[250px]
                    rounded-full
                    bg-[#ffdfad]
                    sm:h-[285px]
                    sm:w-[285px]
                    lg:right-[9%]
                    lg:h-[310px]
                    lg:w-[310px]
                  "
                />
              )}

              {/* Content */}
              <div className="relative z-10 max-w-[500px]">
                {project.showLogo && (
                  <img
                    src={smartGuardLogo}
                    alt="SmartGuard Monitoring Platform"
                    draggable="false"
                    className="
                      mb-7
                      h-auto
                      w-[150px]
                      select-none
                      object-contain
                      sm:w-[175px]
                      lg:w-[190px]
                    "
                  />
                )}

                <h3
                  className="
                    max-w-[450px]
                    text-[25px]
                    font-extrabold
                    leading-[1.28]
                    tracking-[-0.015em]
                    text-[#06365f]
                    sm:text-[30px]
                    lg:text-[32px]
                  "
                >
                  {project.title}
                </h3>

                <p
                  className="
                    mt-5
                    max-w-[470px]
                    text-[13px]
                    leading-[1.75]
                    text-[#65758d]
                    sm:text-[14px]
                  "
                >
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {projectTags.map((tag) => (
                    <span
                      key={`${project.id}-${tag}`}
                      className="
                        rounded-[5px]
                        bg-white
                        px-3
                        py-1.5
                        text-[10px]
                        font-medium
                        text-[#4a6178]
                        shadow-[0_2px_8px_rgba(22,52,84,0.04)]
                        sm:text-[11px]
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWorkShowcase;
