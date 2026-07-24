import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

import blog1 from "../../assets/images/home/blog/blog1.svg";
import blog2 from "../../assets/images/home/blog/blog2.svg";
import blog3 from "../../assets/images/home/blog/blog3.svg";

const blogPosts = [
  {
    id: 1,
    image: blog1,
    author: "Jessica Alford",
    title: "How To Own Web Design Agency For Free",
    month: "AUG",
    day: "02",
  },
  {
    id: 2,
    image: blog2,
    author: "Jessica Alford",
    title: "5 Difficult Things About Web Design Agency",
    month: "AUG",
    day: "02",
  },
  {
    id: 3,
    image: blog3,
    author: "Jessica Alford",
    title: "Web Design Agency Is So Famous, But Why?",
    month: "AUG",
    day: "02",
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const LatestBlog = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        px-5
        py-16
        sm:px-7
        sm:py-20
        lg:px-10
        xl:px-14
        lg:py-24
      "
    >
      {/* Decorative dotted pattern */}
      <div className="pointer-events-none absolute left-0 top-0 hidden h-[210px] w-[190px] sm:block">
        {Array.from({ length: 37 }).map((_, index) => {
          const row = Math.floor(index / 5);
          const column = index % 5;

          return (
            <span
              key={index}
              className="absolute h-[4px] w-[4px] rounded-full bg-[#98a5e5]"
              style={{
                left: `${10 + column * 32 + (row % 2) * 18}px`,
                top: `${18 + row * 25}px`,
                opacity: 0.75,
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1320px]">
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-12 text-center sm:mb-14"
        >
          <h2
            className="
              text-[30px]
              font-extrabold
              leading-tight
              tracking-[-0.02em]
              text-[#07345d]
              sm:text-[38px]
              lg:text-[40px]
            "
          >
            Latest News From Our Blog
          </h2>
        </motion.div>

        {/* Blog cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            staggerChildren: 0.16,
          }}
          className="
            grid
            grid-cols-1
            gap-7
            md:grid-cols-2
            lg:grid-cols-3
            lg:gap-6
          "
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              whileHover={{
                y: -6,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-[12px]
                bg-white
                shadow-[0_6px_22px_rgba(47,62,139,0.10)]
                transition-shadow
                duration-300
                hover:shadow-[0_12px_32px_rgba(47,62,139,0.16)]
              "
            >
              {/* Image */}
              <div className="relative h-[245px] sm:h-[275px] lg:h-[275px]">
                <img
                  src={post.image}
                  alt={post.title}
                  draggable="false"
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:scale-[1.04]
                  "
                />

                {/* Date badge */}
                <div
                  className="
                    absolute
                    bottom-[-50px]
                    right-[18px]
                    z-20
                    w-[78px]
                    overflow-hidden
                    rounded-[11px]
                    bg-white
                    text-center
                    shadow-[0_3px_10px_rgba(0,0,0,0.12)]
                  "
                >
                  <div
                    className="
                      flex
                      h-[40px]
                      items-center
                      justify-center
                      bg-[#003b68]
                      text-[13px]
                      font-semibold
                      text-white
                    "
                  >
                    {post.month}
                  </div>

                  <div
                    className="
                      flex
                      h-[50px]
                      items-center
                      justify-center
                      text-[18px]
                      font-bold
                      text-[#18244d]
                    "
                  >
                    {post.day}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div
                className="
                  relative
                  min-h-[155px]
                  px-[30px]
                  pb-[28px]
                  pt-[20px]
                  sm:min-h-[165px]
                "
              >
                <p
                  className="
                    mb-5
                    pr-[80px]
                    text-[16px]
                    font-normal
                    tracking-[0.16em]
                    text-[#70758d]
                    sm:text-[17px]
                  "
                >
                  {post.author}
                </p>

                <h3
                  className="
                    max-w-[270px]
                    text-[17px]
                    font-bold
                    leading-[1.65]
                    text-[#04345d]
                    sm:text-[18px]
                  "
                >
                  {post.title}
                </h3>

                {/* Arrow link */}
                <NavLink
                  to="/not-found"
                  aria-label={`Read ${post.title}`}
                  className="
                    absolute
                    bottom-[20px]
                    right-[18px]
                    flex
                    h-[34px]
                    w-[34px]
                    items-center
                    justify-center
                    text-[#17234d]
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  <svg
                    width="27"
                    height="20"
                    viewBox="0 0 27 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 10H25"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18 3L25 10L18 17"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </NavLink>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestBlog;
