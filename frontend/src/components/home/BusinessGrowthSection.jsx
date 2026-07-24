import { motion } from "framer-motion";

import coordinationIcon from "../../assets/images/home/businessGrowth/coordination.svg";
import technologyIcon from "../../assets/images/home/businessGrowth/flexible-technologies.svg";
import projectIcon from "../../assets/images/home/businessGrowth/end-to-end.svg";
import insightsIcon from "../../assets/images/home/businessGrowth/data-insights.svg";
import solutionIcon from "../../assets/images/home/businessGrowth/custom-solutions.svg";

const growthItems = [
  {
    id: 1,
    title: "Coordination",
    description:
      "We also help 10,000k+ patient and students where they can register for exam or certificates.",
    icon: coordinationIcon,
  },
  {
    id: 2,
    title: "Flexible Technologies",
    description:
      "We design systems that evolve with your business, seamlessly adapting to emerging demands and new opportunities.",
    icon: technologyIcon,
  },
  {
    id: 3,
    title: "End-to-End Project",
    description:
      "From strategy to deployment, we support you at every step—turning complex transformations into clear, achievable successes.",
    icon: projectIcon,
  },
  {
    id: 4,
    title: "Data-Driven Insights",
    description:
      "We begin by closely collaborating with you to understand your business goals—laying the foundation for innovative, tailored solutions.",
    icon: insightsIcon,
  },
  {
    id: 5,
    title: "Custom Solutions",
    description:
      "Our team builds software precisely tailored to your business needs, ensuring seamless integration and exceptional performance.",
    icon: solutionIcon,
  },
];

const headingVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const descriptionVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.24,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 42,
    scale: 0.96,
    filter: "blur(4px)",
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

const iconVariants = {
  hidden: {
    opacity: 0,
    scale: 0.72,
    rotate: -12,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const BusinessGrowthSection = () => {
  return (
    <section
      className="
        overflow-hidden
        bg-[#073F6B]
        px-5
        py-14
        text-white
        sm:px-7
        sm:py-16
        lg:px-10
        lg:py-[70px]
        xl:px-14
      "
    >
      <div className="mx-auto w-full max-w-[1320px]">
        {/* Heading */}
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="
            max-w-[900px]
            text-[30px]
            font-semibold
            leading-[1.18]
            tracking-[-0.03em]
            text-white
            sm:text-[36px]
            lg:text-[46px]
          "
        >
          How We Augment Your Business Growth!
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={descriptionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="
            mt-6
            max-w-[1320px]
            text-[15px]
            font-light
            leading-[1.7]
            text-white/95
            sm:text-[16px]
            lg:mt-7
            lg:text-[18px]
          "
        >
          We create innovative software solutions built to scale with your
          business. By combining cutting-edge technology with deep industry
          expertise, our team delivers applications and services that streamline
          operations, boost customer engagement, and drive efficiency. From
          custom development to seamless integration, we empower your growth at
          every stage—helping you stay ahead in an increasingly competitive
          digital landscape.
        </motion.p>

        {/* Growth Items */}
        <motion.div
          variants={itemsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            mt-10
            grid
            grid-cols-1
            gap-8
            sm:mt-12
            sm:grid-cols-2
            lg:mt-[52px]
            lg:grid-cols-5
            lg:gap-8
            xl:gap-10
          "
        >
          {growthItems.map((item) => (
            <motion.article
              key={item.id}
              variants={itemVariants}
              className="group"
            >
              {/* Exact SVG Icon */}
              <motion.div
                variants={iconVariants}
                whileHover={{
                  scale: 1.08,
                  y: -4,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
                  flex
                  h-[52px]
                  w-[52px]
                  items-center
                  justify-center
                "
              >
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  className="
                    h-[48px]
                    w-[48px]
                    object-contain
                    sm:h-[50px]
                    sm:w-[50px]
                  "
                />
              </motion.div>

              <h3
                className="
                  mt-4
                  text-[17px]
                  font-semibold
                  leading-[1.3]
                  tracking-[-0.02em]
                  text-white
                  sm:text-[18px]
                  lg:text-[19px]
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-2.5
                  max-w-[230px]
                  text-[13px]
                  font-light
                  leading-[1.55]
                  text-white/95
                  sm:text-[14px]
                  lg:text-[15px]
                "
              >
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessGrowthSection;
