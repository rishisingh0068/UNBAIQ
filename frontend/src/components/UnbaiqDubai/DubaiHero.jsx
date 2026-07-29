import dubaiHero from "../../assets/images/UnbaiqDubai/dubai.svg";

const DubaiHero = () => {
  return (
    <section className="relative min-h-[calc(100svh-72px)] w-full overflow-hidden bg-white lg:min-h-[680px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[580px] top-[10px] hidden h-[900px] w-[900px] rounded-full xl:block"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 99, 255, 0.21) 0%, rgba(99, 99, 255, 0.1) 48%, transparent 74%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[580px] top-[10px] hidden h-[900px] w-[900px] rounded-full xl:block"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 99, 255, 0.21) 0%, rgba(99, 99, 255, 0.1) 48%, transparent 74%)",
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-72px)] w-full max-w-[1720px] grid-cols-1 items-center gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:min-h-[680px] lg:grid-cols-[0.98fr_1.02fr] lg:gap-12 lg:px-14 lg:py-8 xl:px-20 2xl:px-24">
        <div className="order-2 text-center lg:order-1 lg:min-h-[280px] lg:w-[663px] lg:text-left">
          <h1 className="text-[38px] font-semibold leading-[1.18] tracking-[-0.02em] text-[#06365f] sm:text-[48px] lg:text-[53px]">
            CRM &amp; Mobile Apps
            <br className="hidden sm:block" />
            {" "}for Gulf Businesses
          </h1>

          <p className="mx-auto mt-6 max-w-[663px] text-[17px] font-light leading-[1.5] text-[#49637d] sm:text-[21px] lg:mx-0 lg:text-[24px]">
            Unbaiq Dubai empowers Gulf startups and enterprises with CRM
            systems, mobile apps, and digital experiences designed for growth
            — from concept to launch.
          </p>
        </div>

        <div className="order-1 flex items-center justify-center lg:order-2 lg:justify-end">
          <img
            src={dubaiHero}
            alt="CRM and mobile app analytics for Gulf businesses"
            className="h-auto w-full max-w-[420px] object-contain sm:max-w-[520px] lg:h-[600px] lg:w-[600px] lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
};

export default DubaiHero;
