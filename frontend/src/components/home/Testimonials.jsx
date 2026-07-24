import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import client1 from "../../assets/images/home/testimonials/person1.svg";
import client2 from "../../assets/images/home/testimonials/person2.svg";
import client3 from "../../assets/images/home/testimonials/person3.svg";
import client4 from "../../assets/images/home/testimonials/person4.svg";
import client5 from "../../assets/images/home/testimonials/person5.svg";

const testimonials = [
  {
    id: 1,
    name: "Alexander Gibson",
    review:
      "Es ist ein lang erwiesener Fakt, dass ein Leser vom Text abgelenkt wird, wenn er sich ein Layout ansieht. Der Punkt, Lorem Ipsum zu nutzen, ist, dass es mehr oder weniger die normale Anordnung von Buchstaben darstellt und somit nach lesbarer Sprache aussieht.",
    image: client1,
  },
  {
    id: 2,
    name: "Sarah Williams",
    review:
      "Working with the team was smooth and professional. They understood our requirements clearly and delivered a modern solution that improved usability and business performance.",
    image: client2,
  },
  {
    id: 3,
    name: "Michael Brown",
    review:
      "The complete process was structured, transparent, and efficient. Their design-first approach helped us create a polished and intuitive digital product.",
    image: client3,
  },
  {
    id: 4,
    name: "Emily Johnson",
    review:
      "The team communicated clearly and responded quickly to feedback. The final product exceeded our expectations in performance and design quality.",
    image: client4,
  },
  {
    id: 5,
    name: "David Miller",
    review:
      "Their technical expertise and attention to detail made a real difference. We received a scalable solution that supports our future growth.",
    image: client5,
  },
];

const avatarPositions = [
  `
    left-1/2
    top-[8px]
    -translate-x-1/2
    sm:top-[12px]
    lg:top-[18px]
  `,
  `
    right-[2px]
    top-1/2
    -translate-y-1/2
    sm:right-[3px]
    lg:right-[4px]
  `,
  `
    bottom-[8px]
    left-1/2
    -translate-x-1/2
    sm:bottom-[12px]
    lg:bottom-[18px]
  `,
  `
    left-[2px]
    top-1/2
    -translate-y-1/2
    sm:left-[3px]
    lg:left-[4px]
  `,
];

const contentVariants = {
  hidden: { opacity: 0, x: 38 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0.3 },
  },
};

const centerImageVariants = {
  hidden: { opacity: 0, scale: 0.86 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.25 },
  },
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonial = testimonials[activeIndex];

  const outerTestimonials = useMemo(
    () =>
      testimonials
        .map((testimonial, index) => ({
          ...testimonial,
          originalIndex: index,
        }))
        .filter((testimonial) => testimonial.originalIndex !== activeIndex)
        .slice(0, 4),
    [activeIndex],
  );

  const goToNext = () => {
    setActiveIndex((currentIndex) => {
      return (currentIndex + 1) % testimonials.length;
    });
  };

  const goToPrevious = () => {
    setActiveIndex((currentIndex) => {
      return (
        (currentIndex - 1 + testimonials.length) % testimonials.length
      );
    });
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % testimonials.length;
      });
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="overflow-hidden bg-[#f9f9fd] px-5 py-12 font-lexend sm:px-7 sm:py-16 lg:px-10 lg:py-[72px] xl:px-14">
      <div className="mx-auto w-full max-w-[1320px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-[28px] font-semibold tracking-[-0.025em] text-[#07375A] sm:text-[34px] lg:text-[38px]"
        >
          What Our Clients Says?
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 sm:mt-12 sm:gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -45, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <div className="relative mx-auto h-[280px] w-[280px] min-[380px]:h-[320px] min-[380px]:w-[320px] sm:h-[380px] sm:w-[380px] lg:h-[430px] lg:w-[430px]">
              <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1E2233] min-[380px]:h-[286px] min-[380px]:w-[286px] sm:h-[348px] sm:w-[348px] lg:h-[394px] lg:w-[394px]" />

              <div className="absolute left-1/2 top-1/2 h-[250px] w-[226px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#1E2233] min-[380px]:h-[286px] min-[380px]:w-[258px] sm:h-[348px] sm:w-[316px] lg:h-[394px] lg:w-[358px]" />

              <div className="absolute left-1/2 top-1/2 z-10 h-[118px] w-[118px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-white min-[380px]:h-[134px] min-[380px]:w-[134px] sm:h-[160px] sm:w-[160px] lg:h-[184px] lg:w-[184px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeTestimonial.id}
                    variants={centerImageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    src={activeTestimonial.image}
                    alt={activeTestimonial.name}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute left-[61%] top-1/2 z-20 flex h-[46px] w-[46px] -translate-y-1/2 items-center justify-center rounded-full bg-[#f9f9fd] text-[37px] font-bold leading-none text-[#646ac4] min-[380px]:left-[62%] min-[380px]:h-[52px] min-[380px]:w-[52px] min-[380px]:text-[42px] sm:left-[63%] sm:h-[60px] sm:w-[60px] sm:text-[48px] lg:left-[64%] lg:h-[66px] lg:w-[66px] lg:text-[52px]"
              >
                <span className="-mt-1">“</span>
              </motion.div>

              {outerTestimonials.map((testimonial, index) => (
                <motion.button
                  key={testimonial.id}
                  type="button"
                  onClick={() => setActiveIndex(testimonial.originalIndex)}
                  aria-label={`View testimonial from ${testimonial.name}`}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.12 + index * 0.12,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.96 }}
                  className={`absolute z-30 h-[54px] w-[54px] overflow-hidden rounded-full border-[4px] border-[#f9f9fd] bg-[#f9f9fd] min-[380px]:h-[62px] min-[380px]:w-[62px] sm:h-[74px] sm:w-[74px] lg:h-[84px] lg:w-[84px] ${avatarPositions[index]}`}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="mx-auto w-full max-w-[650px] text-center lg:mx-0 lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <motion.span
                      key={star}
                      initial={{ opacity: 0, y: 10, scale: 0.75 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.07, duration: 0.35 }}
                    >
                      <Star
                        size={22}
                        fill="#FFD400"
                        stroke="#FFD400"
                        strokeWidth={1.2}
                      />
                    </motion.span>
                  ))}
                </div>

                <p className="mt-5 max-w-[650px] text-[14px] font-light leading-[1.85] text-[#303754] sm:text-[15px] lg:text-[17px]">
                  “{activeTestimonial.review}”
                </p>

                <h3 className="mt-4 text-[17px] font-semibold text-[#303754] sm:text-[19px]">
                  {activeTestimonial.name}
                </h3>
              </motion.div>
            </AnimatePresence>

            <div className="mt-7 flex items-center justify-center gap-3 lg:justify-end lg:pr-4">
              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous testimonial"
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full text-[#29334d] transition-all duration-300 hover:bg-white hover:shadow-md"
              >
                <ChevronLeft size={26} strokeWidth={1.5} />
              </button>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Next testimonial"
                className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#313caa] text-white shadow-[0_10px_25px_rgba(49,60,170,0.22)] transition-all duration-300 hover:scale-105 hover:bg-[#283393]"
              >
                <ChevronRight size={27} strokeWidth={1.7} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
