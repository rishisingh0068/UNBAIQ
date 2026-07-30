import aboutHeroImage from "../../assets/images/about/about-hero.webp";

const AboutHero = () => {
  return (
    <section
      className="
        relative
        flex
        min-h-[500px]
        w-full
        items-center
        justify-center
        overflow-hidden
        sm:min-h-[560px]
        lg:min-h-[650px]
      "
    >
      {/* Background Image */}
      <img
        src={aboutHeroImage}
        alt="Unbaiq team working together"
        fetchPriority="high"
        decoding="async"
        draggable="false"
        className="
          absolute
          inset-0
          h-full
          w-full
          select-none
          object-cover
          object-center
        "
      />

      {/* Dark Blue Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-[#05365f]/60
        "
      />

      {/* Additional Gradient Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-[#002f54]/20
          via-[#05365f]/10
          to-[#002f54]/35
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1320px]
          px-5
          pb-12
          pt-24
          text-center
          sm:px-7
          sm:pb-16
          sm:pt-28
          lg:px-10
          xl:px-14
          lg:pb-20
          lg:pt-32
        "
      >
        <h1
          className="
            text-[34px]
            font-extrabold
            leading-tight
            tracking-[-0.025em]
            text-white
            sm:text-[43px]
            lg:text-[52px]
          "
        >
          About Us
        </h1>

        <p
          className="
            mx-auto
            mt-4
            max-w-[760px]
            text-[15px]
            font-normal
            leading-[1.5]
            text-white
            sm:mt-5
            sm:text-[18px]
            lg:max-w-[800px]
            lg:text-[21px]
            lg:leading-[1.35]
          "
        >
          We empower businesses by delivering innovative, custom-built software
          solutions designed to drive growth, enhance efficiency, and ensure
          long-term success in today&apos;s fast-paced digital landscape. Our
          technology adapts to your evolving needs, helping you stay ahead of
          the competition and meet your goals with confidence.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
