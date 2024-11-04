import { useEffect, useState } from "react";
import HeroInstallPWAButton from "../elements/heroPwaButton";

/* eslint-disable @next/next/no-img-element */
const WhatWeDo = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Function to check screen width and set isMobile state
  const handleResize = () => {
    setIsMobile(window.innerWidth < 700);
  };

  useEffect(() => {
    // Set initial state
    handleResize();

    // Add event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="flex justify-center">
      <div className="px-[5%] max-w-8xl mt-[35vh] sm:mt-[35vh] md:mt-[80vh] lg:mt-[70vh]">
        {isMobile && <HeroInstallPWAButton />}
        <div
          className="w-full bg-[url('/images/second_bg.svg')] py-8 rounded-5 md:rounded-[65px]  relative z-0"
          style={{
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundOrigin: "content-box",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex justify-center items-center py-10">
            <div
              className="relative text-white text-center py-[40px] px-6 lg:px-[100px]"
              style={{
                background: "linear-gradient(to right, #00B4DB, #0083B0)",
                clipPath: "polygon(0 0%, 100% 0%, 90% 100%, 10% 100%)",
                borderRadius: "10px",
                maxWidth: "85%",
              }}
            >
              <p className="font-serif text-sm md:text-base">
                At City Logistics, we are committed to providing exceptional
                delivery services that exceed your expectations. Our company was
                founded with a singular goal: to make deliveries fast, reliable,
                and hassle-free for businesses and individuals alike.
              </p>
            </div>
          </div>
          <p className="text-xl sm:text-2xl text-center font-semibold text-white mt-3">
            WHAT WE DO
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 mt-10 mb-10 px-6 lg:px-[100px]">
            {deliveryOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white rounded-[20px] shadow-lg p-6 w-full text-center"
              >
                <img
                  src={option.image}
                  alt={option.title}
                  className="h-32 w-full rounded-[10px] object-cover mb-4"
                />
                <h3 className="text-lg md:text-xl mb-2">{option.title}</h3>
                <p className="font-serif text-sm md:text-base">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default WhatWeDo;

const deliveryOptions = [
  {
    title: "SAME-DAY DELIVERY",
    description:
      "Perfect for urgent deliveries, our same-day service guarantees your package arrives within hours.",
    image: "/images/same_day.svg",
  },
  {
    title: "NEXT-DAY DELIVERY",
    description:
      "For a more flexible option, our next-day delivery ensures prompt and reliable service.",
    image: "/images/next_day.svg",
  },
  {
    title: "SCHEDULED DELIVERIES",
    description:
      "Customize your delivery schedule to meet your specific requirements.",
    image: "/images/scheduled_del.svg",
  },
  {
    title: "SPECIAL HANDLING",
    description:
      "We cater to delicate and high-value items with extra care and security.",
    image: "/images/special_hand.svg",
  },
];
