import letsTalkHero from "../../assets/images/letsTalk/lets-talk-hero.svg";

const LetsTalkHero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white px-5 sm:px-7 lg:px-10 xl:px-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[580px] top-[10px] hidden h-[900px] w-[900px] rounded-full xl:block"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 99, 255, 0.21) 0%, rgba(99, 99, 255, 0.1) 48%, transparent 74%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[580px] top-[10px] hidden h-[900px] w-[900px] rounded-full xl:block"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 99, 255, 0.21) 0%, rgba(99, 99, 255, 0.1) 48%, transparent 74%)",
        }}
      />

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          min-h-[620px]
          max-w-[1320px]
          grid-cols-1
          items-center
          gap-10
          py-4
          sm:py-12
          lg:grid-cols-[0.9fr_1.1fr]
          lg:py-10
        "
      >
        {/* Left Content */}
        <div
          className="
            order-2
            text-center
            lg:order-1
            lg:flex
            lg:h-[310px]
            lg:w-[571px]
            lg:flex-col
            lg:justify-center
            lg:text-left
          "
        >
          <h1
            className="
              text-[42px]
              font-semibold
              leading-tight
              tracking-[-0.025em]
              text-[#063d6b]
              sm:text-[52px]
              lg:text-[53px]
            "
          >
            Let’s Talk
          </h1>

          <p
            className="
              mt-2
              max-w-[571px]
              text-[18px]
              font-light
              leading-[1.5]
              text-[#556b82]
              sm:text-[20px]
              lg:text-[24px]
            "
          >
            Get in touch to start discussing your software product needs.
          </p>

          <p
            className="
              mt-2
              max-w-[571px]
              text-[18px]
              font-light
              leading-[1.5]
              text-[#556b82]
              sm:text-[20px]
              lg:text-[24px]
            "
          >
            Not sure where to start? We can help with that too.
          </p>
        </div>

        {/* Right Illustration */}
        <div
          className="
            order-1
            flex
            justify-center
            lg:order-2
            lg:justify-end
          "
        >
          <img
            src={letsTalkHero}
            alt="Let's Talk"
            draggable="false"
            className="
              h-auto
              w-full
              max-w-[420px]
              select-none
              object-contain
              sm:max-w-[520px]
              lg:h-[399px]
              lg:w-[536px]
              lg:max-w-none
            "
          />
        </div>
      </div>
    </section>
  );
};

export default LetsTalkHero;
