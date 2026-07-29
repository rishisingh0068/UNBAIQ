const DubaiOffice = () => {
  return (
    <section className="w-full bg-[#f5f7f9] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:px-14">
      <div className="mx-auto w-full max-w-[1720px]">
        <div className="text-center">
          <h2 className="text-[30px] font-semibold leading-tight text-[#06365f] sm:text-[36px] lg:text-[40px]">
            Visit Our Dubai Office
          </h2>
          <p className="mx-auto mt-5 max-w-[680px] text-[14px] font-light leading-[1.6] text-[#173f61] sm:text-[16px]">
            We&apos;re located in the heart of Dubai — connecting with clients
            across the Gulf.
            <br className="hidden sm:block" />
            Drop by or reach out to discuss your next project.
          </p>
        </div>

        <div className="mt-9 overflow-hidden rounded-[12px] bg-[#dfe6eb] sm:mt-11 lg:mt-12">
          <iframe
            title="Unbaiq Dubai office location"
            src="https://www.google.com/maps?q=Dubai%2C%20United%20Arab%20Emirates&z=8&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-[360px] w-full border-0 sm:h-[500px] lg:h-[640px]"
          />
        </div>
      </div>
    </section>
  );
};

export default DubaiOffice;
