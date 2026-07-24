import dedicatedTeamsImage from "../../assets/images/ourApproch/whatMakesDifferent/dedicated-team.svg";
import hybridTeamsImage from "../../assets/images/ourApproch/whatMakesDifferent/hybrid-team.svg";
import uiUxDesignersImage from "../../assets/images/ourApproch/whatMakesDifferent/ui-ux-designers.svg";
import frontEndDevelopersImage from "../../assets/images/ourApproch/whatMakesDifferent/frontend-developers.svg";
import backEndDevelopersImage from "../../assets/images/ourApproch/whatMakesDifferent/backend-developers.svg";
import qualityAssuranceImage from "../../assets/images/ourApproch/whatMakesDifferent/quality-assurance.svg";
import devOpsEngineersImage from "../../assets/images/ourApproch/whatMakesDifferent/devops-engineers.svg";
import businessAnalystsImage from "../../assets/images/ourApproch/whatMakesDifferent/business-analysts.svg";

const teamData = [
  {
    id: 1,
    title: "Dedicated Teams",
    image: dedicatedTeamsImage,
    description: [
      "Partnering with a dedicated team of software product developers gives you access to deep industry expertise, the latest frameworks, comprehensive solutions to fuel your launch, and secure quality and consistency.",
      "Whether you're launching a startup, modernizing your business, or developing an MVP or prototype, we serve as your trusted technology partner.",
    ],
  },
  {
    id: 2,
    title: "Hybrid Teams",
    image: hybridTeamsImage,
    description: [
      "Get the expertise and mastery you need to take on complex, large-scale projects.",
      "With teams based in the United States and India, our hybrid model blends the edge of global and local talent with an understanding of your challenges and culture with precision.",
      "For fast, high-quality solutions to elevate projects, count on our hybrid teams to deliver.",
    ],
  },
  {
    id: 3,
    title: "UX and UI Designers",
    image: uiUxDesignersImage,
    description: [
      "UX design enhances customer satisfaction by making your application seamless, intuitive, and enjoyable—from the start of the buying journey through post-sale engagement.",
      "UI design demands close collaboration to ensure every interface is visually appealing, intuitive, and aligned with your brand identity.",
    ],
  },
  {
    id: 4,
    title: "Front-End Developers",
    image: frontEndDevelopersImage,
    description: [
      "Front-end developers build the visual and interactive elements of your software, everything users see and engage with directly.",
      "Using HTML, CSS, and modern JavaScript frameworks, they create intuitive interfaces while ensuring responsiveness, usability, and consistent performance across websites and web applications.",
    ],
  },
  {
    id: 5,
    title: "Back-End Developers",
    image: backEndDevelopersImage,
    description: [
      "Back-end developers work behind the scenes to build the foundation of your application. They write the algorithms and logic that ensure everything functions smoothly and reliably.",
      "Their responsibilities include designing the application architecture, managing communication between services and databases, integrating APIs and third-party systems, and developing secure, scalable, bug-free products.",
    ],
  },
  {
    id: 6,
    title: "Quality Assurance Engineers",
    image: qualityAssuranceImage,
    description: [
      "Our QA engineers apply rigorous testing processes to validate software functionality, performance, security, and usability.",
      "They identify bugs and performance gaps early, helping deliver a polished, reliable product that works consistently across devices, browsers, and platforms.",
    ],
  },
  {
    id: 7,
    title: "DevOps Engineers",
    image: devOpsEngineersImage,
    description: [
      "DevOps engineers focus on the processes, tools, and practices that connect software development, infrastructure, and release operations.",
      "They ensure your application is secure, scalable, and always available—ready to handle everything from routine updates to unexpected traffic surges.",
    ],
  },
  {
    id: 8,
    title: "Business Analysts",
    image: businessAnalystsImage,
    description: [
      "Business analysts collaborate with stakeholders to identify how data-driven changes can enhance business performance.",
      "They monitor market trends, evaluate competitor activity, research user needs, and translate business goals into clear product requirements for design and development teams.",
    ],
  },
];

const WhatMakesUsDifferent = () => {
  return (
    <section
      className="
        w-full
        overflow-hidden
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
        {/* Heading Section */}
        <div className="mx-auto max-w-[900px] text-center">
          <h2
            className="
              text-[29px]
              font-extrabold
              leading-[1.25]
              tracking-[-0.025em]
              text-[#063d6b]
              sm:text-[36px]
              lg:text-[42px]
            "
          >
            What we do which makes us different
            <br className="hidden sm:block" />
            from other
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[860px]
              text-[13px]
              leading-[1.75]
              text-[#305d7d]
              sm:text-[14px]
              lg:text-[15px]
            "
          >
            As a software development company, we go beyond just writing code—we
            become your strategic technology partner. We combine deep industry
            insight with dedicated expertise, user-centric design, and scalable
            architecture to deliver solutions tailored to your exact business
            needs. Our collaborative approach, focus on long-term value, and
            commitment to quality ensure that every product we build drives
            measurable impact and lasting success.
          </p>
        </div>

        {/* Team Sections */}
        <div
          className="
            mt-14
            flex
            flex-col
            gap-14
            sm:mt-16
            sm:gap-16
            lg:mt-20
            lg:gap-20
          "
        >
          {teamData.map((team, index) => {
            const imageOnLeft = index % 2 === 0;

            return (
              <article
                key={team.id}
                className="
                  grid
                  grid-cols-1
                  items-center
                  gap-8
                  lg:grid-cols-2
                  lg:gap-14
                  xl:gap-20
                "
              >
                {/* Image */}
                <div
                  className={`
                    ${imageOnLeft ? "lg:order-1" : "lg:order-2"}
                    flex
                    w-full
                    items-start
                    justify-center
                  `}
                >
                  <div
                    className="
                      flex
                      min-h-[260px]
                      w-full
                      max-w-[520px]
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-[10px]
                      bg-white
                      sm:min-h-[320px]
                      lg:min-h-[360px]
                    "
                  >
                    <img
                      src={team.image}
                      alt={team.title}
                      draggable="false"
                      className="
                        h-auto
                        max-h-[420px]
                        w-full
                        select-none
                        object-contain
                      "
                    />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`
                    ${imageOnLeft ? "lg:order-2" : "lg:order-1"}
                    flex
                    flex-col
                    justify-center
                    lg:items-start
                  `}
                >
                  <h3
                    className="
                      text-[24px]
                      font-extrabold
                      leading-tight
                      tracking-[-0.02em]
                      text-[#063d6b]
                      sm:text-[27px]
                      lg:text-[30px]
                    "
                  >
                    {team.title}
                  </h3>

                  <div className="mt-4 flex flex-col gap-3">
                    {team.description.map((paragraph, paragraphIndex) => (
                      <p
                        key={`${team.id}-${paragraphIndex}`}
                        className="
                          max-w-[540px]
                          text-[13px]
                          leading-[1.75]
                          text-[#305d7d]
                          sm:text-[14px]
                          lg:text-[15px]
                        "
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatMakesUsDifferent;
