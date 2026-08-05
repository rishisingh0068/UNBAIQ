import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { getPublicFaqs } from "../../services/faq";
import { subscribeToContentUpdates } from "../../services/liveUpdates";

const fallbackFaqs = [
  {
    id: 1,
    question: "Why should I invest in digital transformation?",
    answer:
      "Digital transformation helps businesses improve efficiency, reduce operational costs, enhance customer experience, and stay competitive in a rapidly changing market.",
  },
  {
    id: 2,
    question:
      "Can a product engineering company help with prototyping and testing?",
    answer:
      "Yes. A product engineering company can help create prototypes, validate ideas, perform usability testing, and identify technical risks before full-scale development begins.",
  },
  {
    id: 3,
    question:
      "In what ways can digital transformation affect customer experiences?",
    answer:
      "It can make customer interactions faster, more personalized, and more convenient through automation, digital platforms, analytics, and improved service accessibility.",
  },
  {
    id: 4,
    question:
      "How can a product engineering company assist with change management?",
    answer:
      "They can support planning, technology adoption, process redesign, employee training, and implementation so that teams can transition smoothly to new systems.",
  },
  {
    id: 5,
    question:
      "Can a product engineering company help with legacy system modernization?",
    answer:
      "Yes. Legacy systems can be assessed, upgraded, migrated, integrated, or rebuilt to improve performance, security, scalability, and maintainability.",
  },
];

const FaqSection = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [faqData, setFaqData] = useState(fallbackFaqs);

  // Load managed FAQs and refetch them whenever the backend broadcasts a FAQ mutation.
  useEffect(() => {
    let active = true;
    const loadFaqs = () => getPublicFaqs()
      .then(({ faqs }) => {
        if (active) setFaqData(faqs.map((faq) => ({ ...faq, id: faq._id })));
      })
      .catch(() => {
        // Existing questions remain visible during a temporary backend failure.
      });

    loadFaqs();
    const unsubscribe = subscribeToContentUpdates("faqs", loadFaqs);
    return () => { active = false; unsubscribe(); };
  }, []);

  const handleToggle = (id) => {
    setActiveFaq((currentId) => (currentId === id ? null : id));
  };

  // Hide the shared section when the admin has no active questions.
  if (faqData.length === 0) return null;

  return (
    <section className="w-full bg-transparent px-5 py-12 sm:px-7 lg:px-10 xl:px-14">
      <div className="mx-auto w-full max-w-[1320px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="
            mb-7
            text-[24px]
            font-extrabold
            leading-tight
            text-[#07345d]
            sm:text-[28px]
            lg:text-[32px]
          "
        >
          In case you&apos;re wondering ...
        </motion.h2>

        <div className="w-full">
          {faqData.map((faq) => {
            const isOpen = activeFaq === faq.id;

            return (
              <div
                key={faq.id}
                className="border-b border-[#dfe5ea]"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-5
                    py-5
                    text-left
                  "
                >
                  <span
                    className="
                      text-[14px]
                      font-semibold
                      leading-6
                      text-[#07345d]
                      sm:text-[15px]
                    "
                  >
                    {faq.question}
                  </span>

                  <span
                    className="
                      flex
                      h-[24px]
                      w-[24px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#eef3f7]
                      text-[#45657f]
                      transition-transform
                      duration-300
                    "
                  >
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-[17px] font-medium leading-none"
                    >
                      +
                    </motion.span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        height: {
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        opacity: {
                          duration: 0.25,
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div
                        className="
                          max-w-[900px]
                          pb-5
                          pr-10
                          text-[14px]
                          leading-7
                          text-[#637485]
                          sm:text-[15px]
                        "
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
