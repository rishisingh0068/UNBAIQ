import bringIdeasHero from "../../assets/images/whatWeDo/bringIdeas/bring-ideas-hero.svg";

const BringIdeas = () => {
  return (
    <main className="w-full overflow-hidden bg-white">
      {/* Hero Section */}
      <section
        className="
          relative
          w-full
          overflow-hidden
          bg-white
          px-5
          pt-4
          sm:px-7
          sm:pt-16
          lg:px-10
          xl:px-14
          lg:pt-0
          lg:min-h-[625.07px]
        "
      >
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
            max-w-[1320px]
            grid-cols-1
            items-center
            gap-8
            lg:grid-cols-[0.92fr_1.08fr]
            lg:gap-10
            lg:min-h-[625.07px]
          "
        >
          {/* Left Content */}
          <div
            className="
              pb-8
              text-center
              sm:pb-10
              lg:pb-16
              lg:text-left
              xl:absolute
              xl:left-0
              xl:top-[210px]
              xl:flex
              xl:h-[220px]
              xl:w-[663px]
              xl:flex-col
              xl:gap-4
              xl:pb-0
            "
          >
            <h1
              className="
                mx-auto
                max-w-[500px]
                text-[32px]
                font-semibold
                leading-[1.16]
                tracking-[-0.025em]
                text-[#06365f]
                sm:text-[40px]
                lg:mx-0
                lg:text-[46px]
                xl:h-[132px]
                xl:w-[663px]
                xl:max-w-none
                xl:text-[53.17px]
                xl:leading-[66.47px]
              "
            >
              Bring ideas to life
              <br />
              quickly and expertly
            </h1>

            <p
              className="
                mx-auto
                mt-4
                max-w-[430px]
                text-[14px]
                leading-[1.7]
                text-[#6d7a97]
                sm:text-[15px]
                lg:mx-0
                xl:mt-0
              "
            >
              Scalable, expert-led development—when
              <br className="hidden sm:block" />
              you need it, how you need it.
            </p>
          </div>

          {/* Right Hero Image */}
          <div
            className="
              flex
              items-end
              justify-center
              lg:justify-end
            "
          >
            <img
              src={bringIdeasHero}
              alt="Expert working on product development"
              draggable="false"
              className="
                h-auto
                w-full
                max-w-[500px]
                select-none
                object-contain
                sm:max-w-[540px]
                lg:absolute
                lg:bottom-auto
                lg:left-1/2
                lg:top-[90px]
                lg:z-20
                lg:block
                lg:h-[487.07px]
                lg:w-[536.27px]
                lg:max-w-none
                lg:opacity-100
                lg:translate-x-0
              "
            />
          </div>
        </div>
      </section>

    </main>
  );
};

export default BringIdeas;
