/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// import Swiper core and required modules
import { Autoplay, EffectFade } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { useState } from "react";
const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  function createArrayWithDynamicMaxValue(length) {
    const numbers = [];

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      numbers.push(randomNumber);
    }

    return numbers;
  }
  const swiperLength = testimonials.length || 0;

  const numberArray = createArrayWithDynamicMaxValue(swiperLength);

  const CustomNavigation = () => {
    const swiper = useSwiper();

    return (
      <div>
        <div className="mt-3 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => swiper.slidePrev()}
              disabled={activeIndex === 0}
              className={`w-[40px] h-[40px] flex items-center justify-center bg-white disabled:bg-[#D9D9D9] disabled:opacity-20 rounded-full`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {numberArray.map((index, i) => (
              <div
                key={i}
                className={`${
                  i === activeIndex ? "bg-white" : "bg-[#D9D9D9] opacity-20"
                } h-[10px] w-[10px] rounded-full`}
              ></div>
            ))}
            <button
              type="button"
              onClick={() => swiper.slideNext()}
              disabled={activeIndex === 2}
              className={`w-[40px] h-[40px] flex items-center justify-center bg-white disabled:bg-[#D9D9D9] disabled:opacity-20 rounded-full`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div
      className="w-full  md:pb-10 bg-[url('/images/testimonials_bg.svg')]"
      style={{
        //   backgroundPosition: "left bottom",
        backgroundSize: "cover",
        backgroundOrigin: "content-box",
        backgroundRepeat: "no-repeat",
      }}
    >
      <p className="text-xl sm:text-2xl text-center font-semibold text-primary text-white pt-[70px] md:pt-[120px] mb-8">
        TESTIMONIALS
      </p>

      <Swiper
        className="mySwiper"
        slidesPerView={1}
        //   spaceBetween={30}
        // effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        onSlideChange={(properties) => {
          setActiveIndex(properties.activeIndex);
        }}
      >
        {testimonials.map((testimonial, i) => (
          <SwiperSlide className="swiper-slide" key={i}>
            <div>
              <div className="relative grid grid-cols-1 sm:grid-cols-2 px-[5%] pb-[70px]">
                <div className="text-white font-serif pt-10">
                  <p className="text-sm lg:text-base text-left ">
                    {testimonial.testimony}
                  </p>
                  <div className="flex w-full mt-8">
                    <div className="ml-auto">
                      <p className="text-sm lg:text-base">
                        - {testimonial.name}
                      </p>
                      <p className="text-[#90BBE3] text-sm lg:text-base">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                  <CustomNavigation />
                </div>
                <div className="hidden sm:block w-[80%] ml-[18%] h-full">
                  <img
                    src={testimonial.imgUrl}
                    alt={testimonial.name}
                    className={` h-full w-full`}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;

const testimonials = [
  {
    name: "Ifeoma Okoli",
    position: "Senior Executive",
    testimony:
      "Lorem dolor sit amet consectetur. Bibendum pellentesque quis sagittis sed nisl non fringilla interdum pulvinar. Purus dictum consectetur amet eu parturient molestie consectetur non vulputate. Convallis augue pellentesque adipiscing augue aenean. Quis ante eros dignissim pretium amet vulputate sed.",
    imgUrl: "/images/test-1.svg",
  },
  {
    name: "Mary Parish",
    position: "Student",
    testimony:
      "Lorem ipsum dolor sit amet consectetur. Bibendum pellentesque quis sagittis sed nisl non fringilla interdum pulvinar. Purus dictum consectetur amet eu parturient molestie consectetur non vulputate. Convallis augue pellentesque adipiscing augue aenean. Quis ante eros dignissim pretium amet vulputate sed.",
    imgUrl: "/images/test-2.svg",
  },
  {
    name: "David Burns",
    position: "Senior Executive",
    testimony:
      "Lorem ipsum dolor sit amet consectetur. Bibendum pellentesque quis sagittis sed nisl non fringilla interdum pulvinar. Purus dictum consectetur amet eu parturient molestie consectetur non vulputate. Convallis augue pellentesque adipiscing augue aenean. Quis ante eros dignissim pretium amet vulputate sed.",
    imgUrl: "/images/test-3.svg",
  },
];
