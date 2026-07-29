import { motion } from "framer-motion";
import { Send } from "lucide-react";

import machineLearning from "../../assets/images/whatWeDo/rightSolutions/machine-learning.svg";
import dataEngineering from "../../assets/images/whatWeDo/rightSolutions/data-engineering.svg";
import uxUiDesign from "../../assets/images/whatWeDo/rightSolutions/ux-ui-design.svg";
import productDevelopment from "../../assets/images/whatWeDo/rightSolutions/product-development.svg";
import enterpriseSoftware from "../../assets/images/whatWeDo/rightSolutions/enterprise-software.svg";
import mobileAppDevelopment from "../../assets/images/whatWeDo/rightSolutions/mobile-app-development.svg";
import devops from "../../assets/images/whatWeDo/rightSolutions/devops.svg";
import qualityAssurance from "../../assets/images/whatWeDo/rightSolutions/quality-assurance.svg";
import webDevelopment from "../../assets/images/whatWeDo/rightSolutions/web-development.svg";
import { NAVBAR_CONTAINER } from "../../styles/theme";

const solutions = [
  {
    id: 1,
    title: "Machine Learning & AI",
    description:
      "Build intelligent solutions using artificial intelligence and machine learning technologies.",
    icon: machineLearning,
  },
  {
    id: 2,
    title: "Data Engineering & Analytics",
    description:
      "Transform complex business data into meaningful insights and smarter decisions.",
    icon: dataEngineering,
  },
  {
    id: 3,
    title: "UX/UI Design",
    description:
      "Create modern, intuitive and user-friendly digital experiences for your customers.",
    icon: uxUiDesign,
  },
  {
    id: 4,
    title: "Product Development",
    description:
      "Turn your business idea into a scalable, secure and high-performing digital product.",
    icon: productDevelopment,
  },
  {
    id: 5,
    title: "Enterprise Software",
    description:
      "Improve business operations with powerful and customized enterprise software.",
    icon: enterpriseSoftware,
  },
  {
    id: 6,
    title: "Mobile App Development",
    description:
      "Develop responsive and engaging mobile applications for Android and iOS platforms.",
    icon: mobileAppDevelopment,
  },
  {
    id: 7,
    title: "DevOps CI/CD",
    description:
      "Automate development workflows and deliver applications faster with reliable DevOps.",
    icon: devops,
  },
  {
    id: 8,
    title: "Quality Assurance",
    description:
      "Ensure performance, security and reliability through complete software testing.",
    icon: qualityAssurance,
  },
  {
    id: 9,
    title: "Web Development",
    description:
      "Build responsive, fast and scalable websites designed for business growth.",
    icon: webDevelopment,
  },
];

/* Heading animation */
const headingVariants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* Description animation */
const descriptionVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.25,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* Cards container animation */
const cardsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.28,
    },
  },
};

/* Single card animation */
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.9,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const SolutionsSection = () => {
  return (
    <section className="overflow-hidden bg-[#f7f7f8] py-16 sm:py-20 lg:py-24 xl:py-28">
      {/* Reuse the shared page alignment container. */}
      <div className={NAVBAR_CONTAINER}>
        {/* Top content */}
        <div className="relative">
          <motion.div
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="max-w-[720px]"
          >
            <h2 className="font-lexend text-[30px] font-bold leading-[1.25] tracking-[-0.03em] text-[#063456] sm:text-[36px] lg:text-[48px] lg:leading-[80px]">
              We Deliver the Right
              <br className="hidden sm:block" />
              Solutions with Unmatched
              <br className="hidden sm:block" />
              Quality
            </h2>
          </motion.div>

          {/* Paper plane animation */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              delay: 0.4,
              duration: 0.8,
            }}
            className="pointer-events-none absolute right-[3%] top-[-15px] hidden h-[170px] w-[280px] lg:block"
          >
            <svg
              viewBox="0 0 280 170"
              fill="none"
              className="h-full w-full overflow-visible"
              aria-hidden="true"
            >
              <motion.path
                d="
                  M15 10
                  C70 20 125 35 145 72
                  C157 96 139 119 115 108
                  C91 97 98 72 121 72
                  C163 72 188 112 205 142
                "
                stroke="#8791a3"
                strokeWidth="1.5"
                strokeDasharray="6 8"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                whileInView={{
                  pathLength: 1,
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.5,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </svg>

            <motion.div
              initial={{
                opacity: 0,
                x: -25,
                y: -20,
                rotate: -25,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 1.65,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-[1px] right-[35px] text-[#32415d]"
            >
              <Send size={48} strokeWidth={1.35} />
            </motion.div>
          </motion.div>

          <motion.p
            variants={descriptionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="mt-6 max-w-[920px] text-[13px] leading-7 text-[#68758a] sm:text-[14px] lg:text-[15px]"
          >
            Whether you are looking for advanced cloud solutions, artificial
            intelligence, scalable product development or improved digital user
            experiences, we provide complete technology solutions designed
            around your business requirements.
          </motion.p>
        </div>

        {/* Solutions cards */}
        <motion.div
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="
            mt-10
            grid
            grid-cols-1
            gap-5
            sm:mt-12
            sm:grid-cols-2
            lg:mt-14
            lg:grid-cols-3
            lg:gap-x-7
            lg:gap-y-6
          "
        >
          {solutions.map((solution) => (
            <motion.article
              key={solution.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.015,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="
                group
                relative
                min-h-[175px]
                overflow-hidden
                rounded-[12px]
                border
                border-black/[0.04]
                bg-white
                px-6
                py-7
                shadow-[0_10px_35px_rgba(27,39,64,0.07)]
                transition-shadow
                duration-300
                hover:shadow-[0_20px_50px_rgba(27,39,64,0.14)]
                sm:min-h-[185px]
                lg:px-7
              "
            >
              {/* SVG Icon */}
              <motion.div
                whileHover={{
                  rotate: -7,
                  scale: 1.12,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
                  relative
                  z-10
                  flex
                  h-[48px]
                  w-[48px]
                  items-center
                  justify-center
                  rounded-[10px]
                  bg-[#eef4f8]
                  transition-colors
                  duration-300
                  group-hover:bg-[#dceaf3]
                "
              >
                <img
                  src={solution.icon}
                  alt={solution.title}
                  draggable="false"
                  className="
                    h-[28px]
                    w-[28px]
                    select-none
                    object-contain
                    sm:h-[30px]
                    sm:w-[30px]
                  "
                />
              </motion.div>

              {/* Card title */}
              <h3 className="relative z-10 mt-5 text-[16px] font-semibold leading-tight text-[#4e5471] sm:text-[17px]">
                {solution.title}
              </h3>

              {/* Card description */}
              <p className="relative z-10 mt-3 text-[12px] leading-[1.7] text-[#777d8f] sm:text-[13px]">
                {solution.description}
              </p>

              {/* Hover bottom line */}
              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  z-20
                  h-[3px]
                  w-0
                  bg-[#317099]
                  transition-all
                  duration-500
                  ease-out
                  group-hover:w-full
                "
              />

              {/* Decorative circle */}
              <span
                className="
                  absolute
                  -right-10
                  -top-10
                  h-24
                  w-24
                  rounded-full
                  bg-[#eef4f8]
                  opacity-0
                  transition-all
                  duration-500
                  group-hover:right-[-20px]
                  group-hover:top-[-20px]
                  group-hover:opacity-100
                "
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;
