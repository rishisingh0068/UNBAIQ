import { motion } from "framer-motion";

// Apne actual logo paths yahan set karo
import logo1 from "../../assets/images/home/partners/logo1.svg";
import logo2 from "../../assets/images/home/partners/logo2.svg";
import logo3 from "../../assets/images/home/partners/logo3.svg";
import logo4 from "../../assets/images/home/partners/logo4.svg";
import logo5 from "../../assets/images/home/partners/logo5.svg";

const logos = [
  { id: 1, image: logo1, name: "Partner 1" },
  { id: 2, image: logo2, name: "Partner 2" },
  { id: 3, image: logo3, name: "Partner 3" },
  { id: 4, image: logo4, name: "Partner 4" },
  { id: 5, image: logo5, name: "Partner 5" },
];

const LogoMarquee = () => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-transparent
        py-3
        sm:py-4
      "
    >
      <motion.div
        className="flex w-max items-center"
        initial={{ x: 0 }}
      animate={{
  x: [
    0,
    0,

    -210,
    -210,

    -420,
    -420,

    -630,
    -630,

    -840,
    -840,

    -1050,
    -1050,

    0,
  ],
}}
transition={{
  duration: 18,
  repeat: Infinity,
  ease: "linear",
  times: [
    0,
    0.08,

    0.14,
    0.22,

    0.28,
    0.36,

    0.42,
    0.5,

    0.56,
    0.64,

    0.7,
    0.82,

    1,
  ],
}}
      >
        {[...logos, ...logos].map((logo, index) => (
          <motion.div
            key={`${logo.id}-${index}`}
            whileHover={{
              scale: 1.06,
              y: -2,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
  flex
  h-[70px]
  w-[180px]
  shrink-0
  cursor-pointer
  items-center
  justify-center
  px-3
  min-[380px]:w-[200px]
  sm:h-[80px]
  sm:w-[220px]
  sm:px-4
  md:h-[90px]
  md:w-[240px]
  lg:h-[100px]
  lg:w-[260px]
  xl:w-[280px]
"
          >
            <img
              src={logo.image}
              alt={logo.name}
              draggable="false"
              className="
  h-auto
  max-h-[50px]
  w-auto
  max-w-full
  select-none
  object-contain
  sm:max-h-[58px]
  md:max-h-[64px]
  lg:max-h-[72px]
"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default LogoMarquee;