import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { heroSlides } from "../../data/heroSlides";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const HeroSlider = () => {
  return (
    <section className="hero-slider relative w-full overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop
        speed={1100}
        autoplay={{
          delay: 3200,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="h-full w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <article className="relative h-full w-full overflow-hidden bg-black">
              <img
                src={slide.image}
                alt={slide.alt}
                className="hero-slide-image"
              />

              {/* Bottom dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

              {/* Responsive text */}
              <div className="absolute inset-x-0 bottom-0 z-10">
                <div className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 md:px-10 md:pb-24 lg:px-12 lg:pb-28 xl:px-14">
                  <h1 className="hero-slide-title max-w-[90%] text-white sm:max-w-[80%] md:max-w-[70%] lg:max-w-[65%]">
                    {slide.title}
                  </h1>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;