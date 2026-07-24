import letsTalkHero from "../../assets/images/letsTalk/lets-talk-hero.svg";

const LetsTalkHero = () => {
  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-[#fbfbfd]
      "
    >
      <div
        className="
          mx-auto
          grid
          min-h-[calc(100vh-88px)]
          max-w-[1320px]
          grid-cols-1
          items-center
          gap-10
          px-5
          py-12
          sm:px-7
          lg:grid-cols-[0.9fr_1.1fr]
          lg:px-10
          xl:px-14
          lg:py-16
        "
      >
        {/* Left Content */}
        <div
          className="
            order-2
            text-center
            lg:order-1
            lg:text-left
          "
        >
          <h1
            className="
              text-[42px]
              font-extrabold
              leading-tight
              tracking-[-0.025em]
              text-[#063d6b]
              sm:text-[52px]
              lg:text-[64px]
            "
          >
            Let’s Talk
          </h1>

          <p
            className="
              mt-6
              max-w-[520px]
              text-[18px]
              leading-[1.7]
              text-[#556b82]
              sm:text-[20px]
              lg:text-[22px]
            "
          >
            Get in touch to start discussing your software product needs.
          </p>

          <p
            className="
              mt-2
              max-w-[520px]
              text-[18px]
              leading-[1.7]
              text-[#556b82]
              sm:text-[20px]
              lg:text-[22px]
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
              lg:max-w-[620px]
            "
          />
        </div>
      </div>
    </section>
  );
};

export default LetsTalkHero;
