import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

import projectImageOne from "../../assets/images/home/ourwork/our-work-img1.webp";
import projectImageTwo from "../../assets/images/home/ourwork/our-work-img2.webp";
import projectImageThreeOne from "../../assets/images/home/ourwork/our-work-img3-1.webp";
import projectImageThreeTwo from "../../assets/images/home/ourwork/our-work-img3-2.webp";
import projectImageFour from "../../assets/images/home/ourwork/our-work-img1.webp";

const projects = [
  {
    id: 1,
    title:
      "One for the best solutions we designed and developed which helps to track security guards",
    image: projectImageOne,
    background: "#EEF0F2",
  },
  {
    id: 2,
    title:
      "Helped all categories of people where they can go, learn, play and win",
    image: projectImageTwo,
    background: "#A8D3FA",
  },
  {
    id: 3,
    title:
      "We also helped 10,000k+ patients and students where they can register for exams or certificates",
    image: null,
    images: [projectImageThreeOne, projectImageThreeTwo],
    background: "#96A6C0",
  },
  {
    id: 4,
    title:
      "One for the best solutions we designed and developed which helps to track security guards",
    image: projectImageFour,
    background: "#FF2ED2",
  },
];

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
};

const headingVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const subtitleVariants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.35,
      staggerChildren: 0.35,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.94,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageVariants = {
  hidden: {
    scale: 1.15,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.15,
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const buttonVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.4,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ProjectCard = ({ project }) => {
  const isSecondCard = project.id === 2;
  const isThirdCard = project.id === 3;

  return (
    <motion.article
      variants={cardVariants}
      className="group min-w-0 xl:h-[539px] xl:w-[611.56px]"
    >
      <motion.div
        className={`
          relative
          w-full
          overflow-hidden
          rounded-[11px]
          xl:h-[460px]
          xl:aspect-auto
          ${
            isSecondCard
              ? "aspect-[1.35/1] bg-[#A8D3FA]"
              : "aspect-[1.45/1]"
          }
        `}
        style={{
          backgroundColor: project.background,
        }}
      >
        {isThirdCard && project.images ? (
          <div className="absolute inset-y-0 left-[5.5%] right-[5.5%] flex justify-center gap-[2.2%] overflow-hidden bg-[#96A6C0]">
            {/* Run the two previews in opposing vertical directions. */}
            {project.images.map((image, index) => (
              <div
                key={image}
                className="relative h-full min-w-0 flex-1 overflow-hidden"
              >
                <motion.img
                  src={image}
                  alt={`${project.title} preview ${index + 1}`}
                  loading="lazy"
                  draggable="false"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  animate={{
                    y:
                      index === 0
                        ? ["18%", "-42%", "18%"]
                        : ["-42%", "18%", "-42%"],
                  }}
                  transition={{
                    opacity: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    y: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.5, 1],
                    },
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  className="absolute left-0 top-0 h-auto w-full max-w-none select-none will-change-transform"
                />
              </div>
            ))}
          </div>
        ) : (
          project.image &&
          (isSecondCard ? (
            <div className="absolute inset-0 overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                loading="lazy"
                draggable="false"
                initial={{
                  opacity: 0,
                  y: "-8%",
                }}
                whileInView={{
                  opacity: 1,
                }}
                animate={{
                  y: [
                    "-12%",
                    "34%",
                    "8%",
                    "34%",
                    "20%",
                    "34%",
                    "27%",
                    "34%",
                    "31%",
                    "34%",
                    "34%",
                    "-12%",
                  ],
                }}
                transition={{
                  opacity: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  y: {
                    duration: 3.2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: [
                      "easeIn",
                      "easeOut",
                      "easeIn",
                      "easeOut",
                      "easeIn",
                      "easeOut",
                      "easeIn",
                      "easeOut",
                      "easeIn",
                      "linear",
                      "linear",
                    ],
                    times: [
                      0,
                      0.28,
                      0.42,
                      0.55,
                      0.64,
                      0.72,
                      0.78,
                      0.84,
                      0.88,
                      0.92,
                      0.97,
                      1,
                    ],
                  },
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                className="
                  absolute
                  left-1/2
                  top-0
                  h-auto
                  w-[62%]
                  max-w-none
                  -translate-x-1/2
                  rounded-[20px]
                  border
                  border-black/15
                  select-none
                  object-contain
                  will-change-transform
                  sm:w-[58%]
                  lg:w-[56%]
                "
              />
            </div>
          ) : (
            <motion.img
              variants={imageVariants}
              src={project.image}
              alt={project.title}
              loading="lazy"
              draggable="false"
              className="
                h-full
                w-full
                select-none
                object-cover
              "
            />
          ))
        )}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-black/0
            transition-colors
            duration-500
            group-hover:bg-black/[0.025]
          "
        />
      </motion.div>

      <motion.h3
        variants={textVariants}
        className="
          mt-5
          max-w-[470px]
          text-[15px]
          font-semibold
          leading-[1.45]
          tracking-[-0.015em]
          text-black
          sm:text-[16px]
          lg:text-[17px]
        "
      >
        {project.title}
      </motion.h3>
    </motion.article>
  );
};

const OurWorkSection = () => {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
      }}
      className="
        overflow-hidden
        bg-white
        px-5
        py-14
        sm:px-7
        sm:py-16
        lg:px-10
        lg:py-[72px]
        xl:px-14
      "
    >
      <div className="mx-auto w-full max-w-[1320px]">
        {/* Section Heading */}
        <div className="text-center">
          <motion.h2
            variants={headingVariants}
            className="
              text-[26px]
              font-semibold
              leading-tight
              tracking-[-0.025em]
              text-black
              sm:text-[30px]
              lg:text-[34px]
            "
          >
            Our work speaks for itself...
          </motion.h2>

          <motion.p
            variants={subtitleVariants}
            className="
              mx-auto
              mt-4
              max-w-[650px]
              text-[12px]
              font-light
              leading-6
              text-[#718196]
              sm:text-[13px]
              lg:text-[14px]
            "
          >
            Our design-first approach has helped transform innovative businesses
            like these.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={cardsContainerVariants}
          className="
            mt-10
            grid
            grid-cols-1
            gap-x-10
            gap-y-9
            sm:mt-12
            md:grid-cols-2
            lg:mt-14
            lg:gap-x-12
            lg:gap-y-11
          "
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          variants={buttonVariants}
          className="mt-11 flex justify-center sm:mt-12"
        >
          <NavLink
            to="/case-study"
            className="
              group
              view-more-work-btn
              relative
              inline-flex
              h-[42px]
              min-w-[132px]
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
              border-[#07375A]
              bg-white
              px-6
              text-[12px]
              font-medium
              text-[#07375A]
              transition-all
              duration-300
              sm:h-[44px]
              sm:min-w-[145px]
              sm:text-[13px]
            "
          >
            <span className="relative z-10">View More Work</span>
          </NavLink>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OurWorkSection;
