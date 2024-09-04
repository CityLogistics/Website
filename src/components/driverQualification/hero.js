import Image from "next/image";
import DriverRequestForm from "./driverRequestForm";

const DriverHero = () => {
  return (
    <div className="relative mt-[40px] md:mt-[70px]">
      <div className="md:absolute w-full md:top-0 z-0">
        <div className="flex justify-center w-full">
          <div className="w-full md:flex justify-between px-[5%] max-w-8xl gap-6">
            <div className="md:w-[40%]">
              <p className="text-2xl sm:text-[50px] font-semibold text-white">
                YOUR TRUST PARTNER IN DELIVERY
              </p>
              <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[80vh] lg:h-[70vh]">
                <Image
                  src="/images/driver_bg.svg"
                  alt="nav-logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-semibold text-white md:text-black ">
                  AT CITY LOGISTICS, WE DON’T JUST DELIVER PACKAGES,
                </p>
                <p className="text-lg sm:text-xl font-semibold text-primary ">
                  WE DELIVER PEACE OF MIND.
                </p>
                <p className="text-lg sm:text-xl font-semibold text-white md:text-secondary mt-7">
                  JOIN OUR GROWING LIST OF SATISFIED CUSTOMERS AND EXPERIENCE
                  THE DIFFERENCE TODAY!
                </p>
              </div>
            </div>
            <div className="md:w-[60%] mt-[70px] md:mt-0 bg-[#FBFBFB] z-0 shadow-md rounded-[20px] p-6">
              <DriverRequestForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverHero;
