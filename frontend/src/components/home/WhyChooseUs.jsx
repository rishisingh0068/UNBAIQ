import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  CalendarDays,
  Lightbulb,
  Sparkles,
} from "lucide-react";

import whyChooseImage from "../../assets/images/home/whychoose/why-choose-us.svg";
import { NAVBAR_CONTAINER } from "../../styles/theme";

const features = [
  {
    id: 1,
    title: "Advanced Innovative Agency",
    description:
      "Our experienced developers are skilled in the latest technologies, ensuring innovative and high-quality solutions for your business needs.",
    icon: Sparkles,
    iconBackground: "bg-[#ed5ca0]",
  },
  {
    id: 2,
    title: "Customized Solutions",
    description:
      "We tailor every project to meet the unique requirements of each client, delivering solutions perfectly aligned with your business goals.",
    icon: Lightbulb,
    iconBackground: "bg-[#3da9f5]",
  },
  {
    id: 3,
    title: "On-Time Delivery",
    description:
      "We understand the importance of time in business, which is why we prioritize efficient project management to deliver on schedule.",
    icon: CalendarDays,
    iconBackground: "bg-[#d85c63]",
  },
  {
    id: 4,
    title: "Affordable Pricing",
    description:
      "We offer competitive rates without compromising on quality, making us an excellent choice for cost-effective solutions.",
    icon: BadgeDollarSign,
    iconBackground: "bg-[#f7aa5d]",
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

const imageVariants = {
  hidden: {
    opacity: 0,
    x: -70,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: 65,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const WhyChooseUs = () => {
  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24 xl:py-28">
      {/* Reuse the shared page alignment container. */}
      <div className={NAVBAR_CONTAINER}>
        {/* Section Heading */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.4,
          }}
          className="text-center"
        >
          <p className="text-[13px] font-medium text-[#0c3854] sm:text-sm">
            Choose Us
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#292d50] sm:text-4xl lg:text-[39px]">
            Why Choose Us?
          </h2>
        </motion.div>

        {/* Content */}
        <div className="mt-12 grid items-center gap-10 sm:mt-14 lg:mt-16 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16 xl:gap-20">
          {/* Left Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            className="mx-auto w-full max-w-[549px] xl:w-[549px]"
          >
            <div className="aspect-[549/507] w-full overflow-hidden rounded-[24px] bg-gray-100 xl:h-[507px]">
              <motion.img
                src={whyChooseImage}
                alt="UNBAIQ team collaboration"
                whileHover={{
                  scale: 1.04,
                }}
                transition={{
                  duration: 0.55,
                  ease: "easeOut",
                }}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right Features */}
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="flex flex-col gap-8 sm:gap-9 lg:gap-10 xl:h-[507px] xl:justify-between xl:gap-0"
          >
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.article
                  key={feature.id}
                  variants={itemVariants}
                  className="group flex items-start gap-4 sm:gap-5"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 4,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className={`flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[5px] text-white shadow-sm sm:h-[52px] sm:w-[52px] ${feature.iconBackground}`}
                  >
                    <Icon size={24} strokeWidth={1.7} />
                  </motion.div>

                  <div className="pt-0.5">
                    <h3 className="text-[17px] font-semibold leading-tight text-[#292d50] sm:text-[18px]">
                      {feature.title}
                    </h3>

                    <p className="mt-1.5 max-w-[610px] text-[12px] leading-[1.55] text-[#74747c] sm:text-[13px]">
                      {feature.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
