import { motion } from "framer-motion";

import machineLearning from "../../assets/images/whatWeDo/rightSolutions/machine-learning.svg";
import dataEngineering from "../../assets/images/whatWeDo/rightSolutions/data-engineering.svg";
import uxUiDesign from "../../assets/images/whatWeDo/rightSolutions/ux-ui-design.svg";
import productDevelopment from "../../assets/images/whatWeDo/rightSolutions/product-development.svg";
import enterpriseSoftware from "../../assets/images/whatWeDo/rightSolutions/enterprise-software.svg";
import mobileAppDevelopment from "../../assets/images/whatWeDo/rightSolutions/mobile-app-development.svg";
import devops from "../../assets/images/whatWeDo/rightSolutions/devops.svg";
import qualityAssurance from "../../assets/images/whatWeDo/rightSolutions/quality-assurance.svg";
import webDevelopment from "../../assets/images/whatWeDo/rightSolutions/web-development.svg";

const solutions = [
  {
    id: 1,
    icon: machineLearning,
    title: "Machine Learning & AI",
    description: "Take advantage of advanced AI.",
  },
  {
    id: 2,
    icon: dataEngineering,
    title: "Data Engineering & Analytics",
    description: "Gain richer customer insights.",
  },
  {
    id: 3,
    icon: uxUiDesign,
    title: "UX/UI Design",
    description: "Deliver great user experiences.",
  },
  {
    id: 4,
    icon: productDevelopment,
    title: "Product Development",
    description: "Make your product idea its best.",
  },
  {
    id: 5,
    icon: enterpriseSoftware,
    title: "Enterprise Software",
    description: "Cut costs and improve operations.",
  },
  {
    id: 6,
    icon: mobileAppDevelopment,
    title: "Mobile App Development",
    description: "Get a mobile app that wows.",
  },
  {
    id: 7,
    icon: devops,
    title: "DevOps CI/CD",
    description: "Improve efficiency and ROI.",
  },
  {
    id: 8,
    icon: qualityAssurance,
    title: "Quality Assurance",
    description: "Be sure of your product’s quality.",
  },
  {
    id: 9,
    icon: webDevelopment,
    title: "Web Development",
    description: "Get a fresh, engaging web app.",
  },
];

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

const cardsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.8,
      staggerChildren: 0.55,
    },
  },
};

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
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const RightSolutions = () => {
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
        <div className="mx-auto max-w-[850px] text-center">
          <motion.h2
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="
              text-[28px]
              font-extrabold
              leading-[1.35]
              tracking-[-0.02em]
              text-[#06365f]
              sm:text-[36px]
              lg:text-[42px]
            "
          >
            We Deliver the Right Solutions with
            <br className="hidden sm:block" />
            Unmatched Quality
          </motion.h2>

          <motion.p
            variants={descriptionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="
              mx-auto
              mt-5
              max-w-[920px]
              text-[13px]
              leading-[1.8]
              text-[#65778f]
              sm:text-[14px]
              lg:text-[15px]
            "
          >
            Whether you&apos;re seeking advanced cloud solutions, aiming to
            harness the power of AI, or looking to redefine the user
            experience, we are your comprehensive innovation partner.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="
            mt-12
            grid
            grid-cols-1
            gap-5
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
                min-h-[150px]
                overflow-hidden
                rounded-[10px]
                bg-white
                px-6
                py-6
                shadow-[0_5px_24px_rgba(41,55,105,0.08)]
                transition-shadow
                duration-300
                hover:shadow-[0_10px_30px_rgba(41,55,105,0.13)]
                sm:min-h-[160px]
                lg:px-7
                lg:py-7
              "
            >
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

              <h3
                className="
                  mt-4
                  text-[16px]
                  font-semibold
                  leading-[1.4]
                  text-[#4b5272]
                  sm:text-[17px]
                "
              >
                {solution.title}
              </h3>

              <p
                className="
                  mt-2
                  text-[12px]
                  leading-[1.7]
                  text-[#737c94]
                  sm:text-[13px]
                "
              >
                {solution.description}
              </p>

              <span className="absolute bottom-0 left-0 z-20 h-[3px] w-0 bg-[#317099] transition-all duration-500 ease-out group-hover:w-full" />

              <span className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#eef4f8] opacity-0 transition-all duration-500 group-hover:right-[-20px] group-hover:top-[-20px] group-hover:opacity-100" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RightSolutions;
