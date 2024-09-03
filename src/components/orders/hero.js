import Image from "next/image";
import OrderRequestForm from "./orderRequestForm";

const OrderHero = () => {
  return (
    <div className="relative mt-[70px]">
      <div className="absolute w-full top-0 z-0">
        <div className="flex justify-center w-full">
          <div className="w-full flex justify-between px-[5%] max-w-8xl gap-6">
            <div className="w-[40%]">
              <p className="text-2xl sm:text-[50px] font-semibold text-white">
                YOUR TRUST PARTNER IN DELIVERY
              </p>
              <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[80vh] lg:h-[70vh]">
                <Image
                  src="/images/hero_car.svg"
                  alt="nav-logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-semibold text-black ">
                  AT CITY LOGISTICS, WE DON’T JUST DELIVER PACKAGES,
                </p>
                <p className="text-lg sm:text-xl font-semibold text-primary ">
                  WE DELIVER PEACE OF MIND.
                </p>
                <p className="text-lg sm:text-xl font-semibold text-secondary mt-7">
                  JOIN OUR GROWING LIST OF SATISFIED CUSTOMERS AND EXPERIENCE
                  THE DIFFERENCE TODAY!
                </p>
              </div>
            </div>
            <div className="w-[60%] bg-[#FBFBFB] z-0 shadow-md rounded-[20px] p-6">
              <OrderRequestForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHero;
